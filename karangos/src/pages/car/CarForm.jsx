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

const MaxYear = new Date()   // Data de hoje

const currentYear = new Date().getFullYear()
const minYear = 1951
const years = []
for (let year = currentYear; year >= minYear; year--) {
  years.push(year)
}

export default function CarForm() {
  const colors = [
    { value: 'Azul', label: 'Azul' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Vermelho', label: 'Vermelho' }
  ]

  const plateMaskFormatChars = {
    '9': '[0-9]',
    '$': '[A-J-0-9]',
    'A': '[A-Z]'
  }

  const formDefaults = {
    brand: '',
    model: '',
    year_manufacture: '',
    imported: false,
    plates: '',
    selling_price: '',
    selling_date: null
  }

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })

  const { car, formModified } = state

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

      // Converte o formato da data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      if (result.birth_date) result.birth_date = parseISO(result.birth_date)

      setState({ ...params, car: result })
    }
    catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

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
    event.preventDefault()
    feedbackWait(true)
    try {
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }

      if (params.id) {
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
      })
    } catch (error) {
      console.error(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    } finally {
      feedbackWait(false)
    }
  }

  async function handleBackButtonClick() {
    if (
      formModified &&
      !await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?')
    ) return
    navigate('..', { relative: 'path', replace: true })
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar carro #${params.id}` : 'Cadastrar novo carro'}
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
            value={car.brand}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="model"
            label="Modelo"
            fullWidth
            required
            autoFocus
            value={car.model}
            onChange={handleFieldChange}
          />


          <TextField
            name="color"
            label="Cor"
            variant="outlined"
            required
            fullWidth
            value={car.color}
            select
            onChange={handleFieldChange}
          >
            {colors.map(color => (
              <MenuItem key={color.value} value={color.value}>
                {color.label}
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
            value={car.year_manufacture}
            onChange={handleFieldChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>



          <InputMask
            mask="AAA-9$99"
            formatChars={plateMaskFormatChars}
            value={car.plates}
            onChange={handleFieldChange}
          >
            {() => (
              <TextField
                name="plates"
                label="Placa"
                variant="outlined"
                required
                fullWidth
              />
            )}
          </InputMask>

          <TextField
            name="selling_price"
            label="Preço de Venda"
            variant="outlined"
            type="number"
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange}
          />


          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data de venda"
              value={car.selling_date ? new Date(car.selling_date) : null}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true
                }
              }}
              onChange={date => {
                const event = { target: { name: 'selling_date', value: date } }
                handleFieldChange(event)
              }}
              minDate={new Date(1951, 0, 1)}
              maxDate={MaxYear}
            />
          </LocalizationProvider>


          <div className="MuiFormControl-root">
            <FormControlLabel
              sx={{ display: 'inline', width: '50%', justifyContent: 'space-around' }}
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
          </div>
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
        </form>
      </Box>
    </>
  )
}