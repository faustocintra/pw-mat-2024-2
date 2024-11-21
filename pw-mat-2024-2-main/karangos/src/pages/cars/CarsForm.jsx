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
import CheckBox from '@mui/material/Checkbox'

export default function CarsForm() {

  // Lista de cores disponíveis para o carro
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

  // Máscara para o campo de placa do carro
  const plateMaskFormat = {
    9: '[0-9]', // somente dígitos
    $: '[0-9A-J]', // dígito de 0 a 9 ou uma letra de A a J.
    A: '[A-Z]', // letra maiúscula
  }

  // Valores iniciais do formulário
  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: '',
    imported: 0,
    plates: '',
    selling_price: '',
    selling_date: null
  }

  // Navegação e parâmetros de URL
  const navigate = useNavigate()
  const params = useParams()

  // Estado do formulário, com dados do carro e se houve modificação
  const [state, setState] = React.useState({
    Car: { ...formDefaults },
    formModified: false
  })
  const {
    Car,
    formModified
  } = state

  const currentYear = new Date().getFullYear()
  const minYear = 1951
  const years = []
  // Preenche a lista de anos de fabricação disponíveis
  for (let year = currentYear; year >= minYear; year--) {
    years.push(year)
  }

  // Carrega os dados do carro se estiver editando
  React.useEffect(() => {
    if (params.id) loadData()
  }, [])

  // Função para carregar os dados do carro quando estiver editando
  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/Cars/' + params.id 
      )
      const result = await response.json()

      setState({ ...params, Car: result })
    }
    catch(error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  // Função chamada ao alterar um campo do formulário
  function handleFieldChange(event) {
    console.log({ name: event.target.name, value: event.target.value })
    
    const CarCopy = { ...Car }
    CarCopy[event.target.name] = event.target.value
    setState({ ...state, Car: CarCopy, formModified: true })
  }

  // Função para submeter o formulário
  async function handleFormSubmit(event) {
    event.preventDefault()  // Impede o recarregamento da página
    
    feedbackWait(true)
    try {
      const reqOptions = {
        method: 'POST',  // Define o verbo HTTP para criar um novo registro
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Car)
      }

      if(params.id) {
        reqOptions.method = 'PUT'
        await fetch(
          import.meta.env.VITE_API_BASE + '/Cars/' + params.id,
          reqOptions
        )
      } else {
        await fetch(
          import.meta.env.VITE_API_BASE + '/Cars',
          reqOptions
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })  // Navega de volta para a lista
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

  // Função para alterar o estado de um checkbox
  async function handleCheckBoxChange(event) {
    const { name, checked } = event.target
    setState({
       ...state,
       Car: { ...Car, [name]: checked },  // Atualiza o estado com o valor do checkbox
       formModified: true
     })
  }   

  // Função para voltar à página anterior, com confirmação se houver alterações não salvas
  async function handleBackButtonClick() {
    if(
      formModified && 
      ! await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?')
    ) return  // Sai sem fazer nada se o usuário cancelar

    navigate('..', { relative: 'path', 'replace': true })  // Navega para a página anterior
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar carro #${params.id}` : 'Cadastrar novo carro' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          {/* Campos de entrada para Marca e Modelo */}
          <TextField
            variant="filled"
            name="brand"
            label="Marca"
            fullWidth
            required
            value={Car.brand}
            onChange={handleFieldChange}
          />

          <TextField
            variant="filled"
            name="model"
            label="Modelo"
            fullWidth
            required
            value={Car.model}
            onChange={handleFieldChange}
          />

          {/* Campo para selecionar a cor do carro */}
          <TextField
            variant="filled" 
            name="color"
            label="Cor" 
            fullWidth
            required
            value={Car.color}
            select
            onChange={handleFieldChange}
          >
            {colors.map(s => 
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            )}
          </TextField>

          {/* Campo para selecionar o ano de fabricação */}
          <TextField
            name='year_manufacture'
            label='Ano de fabricação'
            variant='filled'
            required
            fullWidth
            select
            value={Car.year_manufacture}
            onChange={handleFieldChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          {/* Checkbox para indicar se o carro é importado */}
          <div className="MuiFormControl-root">
            <CheckBox
              name='imported'
              checked={Car.imported}
              onChange={handleCheckBoxChange}
              color='primary'
            />
            Importado
          </div>

          {/* Campo de entrada para a placa do carro com máscara */}
          <InputMask
            formatChars={plateMaskFormat}
            mask="AAA-9$99"
            value={Car.plates}
            maskChar=" "
            onChange={handleFieldChange}
          >
            { () => 
              <TextField
                variant="filled" 
                name="plates"
                label="Placa"
                fullWidth
                required
              />
            }
          </InputMask>

          {/* Campo para inserir o preço de venda */}
          <TextField
            variant="filled"
            name="selling_price"
            label="Preço de venda"
            fullWidth
            required
            value={Car.selling_price}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '')
              handleFieldChange({ target: { name: 'selling_price', value } })
            }}
          />

          {/* Campo para selecionar a data de venda */}
          <LocalizationProvider 
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data de venda"
              value={Car.selling_date}
              slotProps={{
                textField: {
                  variant: 'filled',
                  fullWidth: true
                }
              }}
              onChange={ date => {
                const event = { target: { name: 'selling_date', value: date } }
                handleFieldChange(event)
              }}
            />
          </LocalizationProvider>

          {/* Botões de Salvar e Voltar */}
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

          {/* Exibição dos dados do carro */}
          <Box sx={{
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw'
          }}>
            {JSON.stringify(Car, null, ' ')}
          </Box>

        </form>
      </Box>
    </>
  )
}
