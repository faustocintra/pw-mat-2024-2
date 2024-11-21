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
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
export default function CarsForm() {

  const colors = [
    { value: 'AMARELO', label: 'AMARELO' },
    { value: 'AZUL', label: 'AZUL' },
    { value: 'BRANCO', label: 'BRANCO' },
    { value: 'CINZA', label: 'CINZA' },
    { value: 'DOURADO', label: 'DOURADO' },
    { value: 'LARANJA', label: 'LARANJA' },
    { value: 'MARROM', label: 'MARROM' },
    { value: 'PRATA', label: 'PRATA' },
    { value: 'PRETO', label: 'PRETO' },
    { value: 'ROSA', label: 'ROSA' },
    { value: 'ROXO', label: 'ROXO' },
    { value: 'VERDE', label: 'VERDE' },
    { value: 'VERMELHO', label: 'VERMELHO' },
  ]

  const formDefaults = {
    brand: '', //marca
    model: '', //modelo
    color: '', //cor do veículo
    year_manufacture: '', //ano de fabricação
    imported: false, // se o veículo é importado ou não
    plates: '', //placas
    selling_price: null, //preço de venda - não é obrigatório preencher
    selling_date: null, //data da venda - não é obrigatório preencher
  }

  const plateMaskFormatChars = {
    9: '[0-9]',    // somente dígitos
    $: '[0-9A-J]', // dig. de 0 a 9 ou A a J
    A: '[A-Z]', //maiúscula de A a Z

  }

  const currentYear = new Date().getFullYear()
  const minYear = 1951
  const years = []
  for (let year = currentYear; year >= minYear; year--) {
    years.push(year)
  } // pega o ano que estamos e se for menor que 1951 diminui

  const navigate = useNavigate() // Função para navegação entre rotas
  const params = useParams() // Acessa parâmetros dinâmicos da URL

  const [state, setState] = React.useState({
    cars: { ...formDefaults },
    formModified: false
  })
  const {
    cars,
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

      setState({ ...state, cars: result, formModified: false  })
    }
    catch(error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  
  function handleFieldChange(event) {

    const carsCopy = { ...cars };
    carsCopy[event.target.name] = event.target.value;
    setState({ ...state, cars: carsCopy, formModified: true });
  }
    

  async function handleFormSubmit(event) {
    event.preventDefault()      // Impede o recarregamento da página

    feedbackWait(true)
    try {
      // Prepara as opções para o fetch
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cars)
      }

      // Fetch para enviar os dados ao back-end.
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
        navigate('..', { relative: 'path', replace: true })
        // Retorna para a página de listagem
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
        { params.id ? `Editar veículo #${params.id}` : 'Cadastrar novo veículo' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          <TextField
            variant="filled" 
            name="brand"
            label="Marca do Veículo"
            fullWidth
            required
            value={cars.brand}
            onChange={handleFieldChange}
          />

          <TextField
            variant="filled" 
            name="model"
            label="Modelo do Veículo"
            fullWidth
            required
            value={cars.model}
            onChange={handleFieldChange}
          />

          <InputMask
            mask='AAA-9$99'
            value={cars.plates}
            onChange={handleFieldChange}
            formatChars={plateMaskFormatChars}
            maskChar=' '
          >
            { () => 
                <TextField
                  variant="filled" 
                  name="plates"
                  label="Placa do Veículo" 
                  fullWidth
                  required
                />
            }
          </InputMask>

          <TextField
            name='color'
            label='Cor do Veículo'
            variant='filled'
            required
            fullWidth
            value={cars.color}
            onChange={handleFieldChange}
            select //transforma um campo de texto em um campo
            // de seleção
          >
            {colors.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name='year_manufacture'
            label='Ano de fabricação'
            variant='filled'
            required
            fullWidth
            select
            value={cars.year_manufacture}
            onChange={handleFieldChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

            {/*marca se o carro é importado*/} 
          <div class="MuiFormControl-root">
            <FormControlLabel
              control={
                <Checkbox
                  variant='filled'
                  name='imported'
                  checked={cars.imported}
                  onChange={(event) => setState({
                    ...state, cars: { ...cars, imported: event.target.checked },
                    formModified: true
                  })}
                  color='primary'
                />
              }
              label='Veículo Importado?'
            />
          </div>

          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label='Data de venda'
              value={cars.selling_date}
              onChange={(value) =>
                handleFieldChange({
                  target: { name: 'selling_date', value },
                })
              }
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            name='selling_price'
            label='Preço de venda'
            variant='filled'
            type='number'
            fullWidth
            value={cars.selling_price}
            onChange={handleFieldChange}
          />

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
            {JSON.stringify(cars, null, 2)}
          </Box>

        </form>
      </Box>
      
    </>
  )
}