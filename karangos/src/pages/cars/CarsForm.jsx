import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputMask from 'react-input-mask'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'
import { Checkbox, FormControlLabel } from '@mui/material'

export default function CarsForm() {

  const colors = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Ciano', label: 'Ciano' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Laranja', label: 'Laranja' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Roxo', label: 'Roxo' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Vermelho', label: 'Vermelho' }
  ]

  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: '',
    plates: '',
    selling_price: '',
    selling_date: null
  }
  const anosDecrescente = (() => {
    const anoAtual = new Date().getFullYear()
    const anosFabricacao = []
    for (let ano = anoAtual; ano >= 1951; ano--) {
      anosFabricacao.push(ano)
    }
    return anosFabricacao
  })()
  
  const plateMaskFormatChars = {
    '9': '[0-9]',
    '$': '[A-J-0-9]',
    'A': '[A-Z]'
  }

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })
  const {
    car: car,
    formModified
  } = state

  // Se estivermos editando um carro, precisamos carregar
  // seus dados assim que o componente for carregado
  React.useEffect(() => {
    // Sabemos que estamos editando (e não cadastrando um novo)
    // carro quando a rota ativa contiver um parâmetro id
    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/cars/' + params.id 
      )
      const result = await response.json()
      
      // Converte o formato da data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      if(result.selling_date) result.selling_date = parseISO(result.selling_date)

      setState({ ...params, car: result })
    }
    catch(error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  /*
    Preenche o campo do objeto car conforme
    o campo correspondente do formulário for
    modificado
  */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam
    // à função handleFieldChange
    console.log({ name: event.target.name, value: event.target.value })

    // Tira uma cópia da variável de estado car
    const carCopy = { ...car }
    // Altera em carCopy apenas o campo da vez
    carCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // car por sua cópia atualizada
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()      // Impede o recarregamento da página

    feedbackWait(true)
    try {
      // Prepara as opções para o fetch
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }

      // Infoca o fetch para enviar os dados ao back-end.
      // Se houver parâmetro na rota, significa que estamos alterando
      // um registro existente e, portanto, o verbo precisa ser PUT
      if(params.id) {
        reqOptions.method = 'PUT'
        await fetch(
          import.meta.env.VITE_API_BASE + '/cars/' + params.id,
          reqOptions
        )
      }
      // Senão, envia com o método POST para criar um novo registro
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + '/cars',
          reqOptions
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        // Retorna para a página de listagem
        navigate('..', { relative: 'path', replace: true })
      })

    }
    catch(error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  async function handleBackButtonClick() {
    if(
      formModified && 
      ! await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?')
    ) return // Sai da função sem fazer nada

    // Aqui o usuário respondeu que quer voltar e perder os dados
    navigate('..', { relative: 'path', 'replace': true })
  }

  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */ }
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar Carro #${params.id}` : 'Cadastrar novo carro' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField
            variant="outlined" 
            name="brand"
            label="Marca"
            fullWidth
            required
            autoFocus
            value={car.brand}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined" 
            name="model"
            label="Modelo"
            fullWidth
            required
            value={car.model}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined" 
            name="color"
            label="Cor"
            fullWidth
            required
            value={car.cor}
            select
            onChange={handleFieldChange}
          >
           {
            colors.map(s => 
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            )
           }
          </TextField>

          <TextField
            variant="outlined"
            name="year_manufacture"
            label="Ano de Fabricação"
            fullWidth
            required
            select // Torna o campo um dropdown
            value={car.year_manufacture || ''} // Valor selecionado
            onChange={handleFieldChange} // Atualiza o estado
          >
            {anosDecrescente.map((ano) => (
              <MenuItem key={ano} value={ano}>
                {ano}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined" 
            name="imported"
            label="Importado"
            fullWidth
            required
            value={car.imported}
            onChange={handleFieldChange}
          />
          
          <FormControlLabel
            sx={{display: 'inline', width: '50%', justifyContent: 'space-around'}}
            control={<Checkbox
              name="imported"
              variant="filled"
              value={car.imported}
              onChange={(event) => handleFieldChange({
                target: {
                  name: 'imported',
                  value: event.target.checked
                }
              })}
              />}
            label="Importado?"
          />

          <InputMask
            mask="AAA-9$99"
            formatChars={plateMaskFormatChars}
            maskChar=" "
            value={car.plates}
            onChange={handleFieldChange}
          >
            {
              () =>
                <TextField
                  name="plates"
                  label="Placa"
                  variant="filled"
                  required
                  fullWidth
                />
            }
          </InputMask>

          <TextField
            name="selling_price"
            label="Preço de Venda"
            variant="filled"
            type='Number'
            fullWidth
            placeholder="R$"
            value={Number(car.selling_price)}
            onChange={handleFieldChange}
          />

          <LocalizationProvider 
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data de venda"
              value={car.selling_date}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true
                }
              }}
              onChange={ date => {
                const event = { target: { name: 'selling_date', value: date } }
                handleFieldChange(event)
              }}
            />
          </LocalizationProvider>

          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
          }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Salvar
            </Button>

            <Button
              variant="outlined"
              onClick={handleBackButtonClick}
            >
              Voltar
            </Button>
          </Box>

          <Box sx={{
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw'
          }}>
            {JSON.stringify(car, null, ' ')}
          </Box>

        </form>
      </Box>
      
    </>
  )
}