import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputMask from 'react-input-mask'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'


export default function CarsForm() {

  const color = [
    { value: 'amarelo', label: 'Amarelo' },
    { value: 'azul', label: 'Azul' },
    { value: 'branca', label: 'Branca' },
    { value: 'chumbo', label: 'Chumbo' },
    { value: 'cinza', label: 'Cinza' },
    { value: 'preto', label: 'Preto' },
    { value: 'vermelho', label: 'Vermelho' },
  ]

  const plateMaskFormatChars = {
    'A': '[a-zA-Z]',        
    '$': '[a-jA-J0-9]',     
    '9': '[0-9]',       
  }

   const formDefaults = {
    brand: '',
    model: '',
    year_manufacture: null,
    color: '',
    imported: false,
    plate: '',
    selling_price: '',
    selling_date: null,
  }

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    cars : { ...formDefaults },
    formModified: false
  })
  const {
    cars ,
    formModified
  } = state

 
  React.useEffect(() => {
    
    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/cars/' + params.id 
      )
      const result = await response.json()
      
      if(result.year_manufacture) result.year_manufacture = parseISO(result.year_manufacture)

      setState({ ...params,cars : result })
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
    
    console.log({ name: event.target.name, value: event.target.value })

    const carsCopy = { ...cars }
   
    carsCopy[event.target.name] = event.target.value
    
    setState({ ...state, cars: carsCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()      
    feedbackWait(true)
    try {
      
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cars)
      }

      
      if(params.id) {
        reqOptions.method = 'PUT'
        await fetch(
          import.meta.env.VITE_API_BASE + '/cars/' + params.id,
          reqOptions
        )
      }
      
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + '/cars',
          reqOptions
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        
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
    ) return 

    
    navigate('..', { relative: 'path', 'replace': true })
  }

  return (
    <>
      
      <Typography variant="h1" gutterBottom>
        { params.id ? `Editar Carro #${params.id}` : 'Cadastrar Carro' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

         
          <TextField
            variant="outlined" 
            name="brand"
            label="Marca"
            fullWidth
            required
            autoFocus
            value={cars.brand}
            onChange={handleFieldChange}
          />
          
          <InputMask
            formatChars={plateMaskFormatChars}
            mask="AAA-$999"
            value={cars.plate}
            maskChar = " "
            onChange={handleFieldChange}
          >
            { () => 
                <TextField
                  variant="outlined" 
                  name="plate"
                  label="Placa" 
                  fullWidth
                  required
                />
            }
          </InputMask>

          
          <LocalizationProvider 
              dateAdapter={AdapterDateFns} 
              adapterLocale={ptBR}
          >
                <DatePicker
                      label="Ano de Fabricação"
                      value={cars.year_manufacture}
                      views={['year']} 
                      minDate={new Date(1951, 0, 1)} 
                      maxDate={new Date()}
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          fullWidth: true
                        }
                      }} 
                        onChange={(date) => {
                          const event = { target: { name: 'year_manufacture', value: date } };
                          handleFieldChange(event);
                      }}
                />
          </LocalizationProvider>

          <TextField
            variant="outlined" 
            name="model"
            label="Modelo" 
            fullWidth
            required
            value={cars.model}
            onChange={handleFieldChange}
          />
         
          <TextField
            variant="outlined" 
            name="selling_price"
            label="Preço de venda"
            fullWidth 
            value={cars.selling_price}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined" 
            name="selling_date"
            label="Data da Venda" 
            fullWidth
            value={cars.selling_date}
            onChange={handleFieldChange}
          />
          
          <TextField
            variant="outlined" 
            name="color"
            label="Cor" 
            fullWidth
            required
            value={cars.color}
            select
            onChange={handleFieldChange}
          >
            {
              color.map(s => 
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

                                          
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
            {JSON.stringify(cars, null, ' ')}
          </Box>

        </form>
      </Box>
      
    </>
  )
}