import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import { feedbackWait, feedbackNotify } from '../../ui/Feedback'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import InputMask from 'react-input-mask'

export default function CarsForm() {
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

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = useState({
    car: { ...formDefaults },
    formModified: false,
  })
  const { car, formModified } = state

  const colorOptions = ["Azul", "Branco", "Cinza", "Preto", "Prata", "Verde", "Vermelho"].sort()
  
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: currentYear - 1951 + 1 }, (_, i) => currentYear - i)

  useEffect(() => {
    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE + '/cars/' + params.id)
      const result = await response.json()
      if (result.selling_date) result.selling_date = parseISO(result.selling_date)
      setState({ ...state, car: result })
    } catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    } finally {
      feedbackWait(false)
    }
  }

  function handleFieldChange(event) {
    const carCopy = { ...car }
    carCopy[event.target.name] = event.target.value
    setState({ ...state, car: carCopy, formModified: true })
  }

  async function handleFormSubmit(event) {
    event.preventDefault()
    feedbackWait(true)
    try {
      const reqOptions = {
        method: params.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      }
      const url = import.meta.env.VITE_API_BASE + '/cars' + (params.id ? '/' + params.id : '')
      await fetch(url, reqOptions)
      feedbackNotify('Carro salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true })
      })
    } catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    } finally {
      feedbackWait(false)
    }
  }

  function handleCheckboxChange(event) {
    setState({ 
      ...state, 
      car: { ...car, imported: event.target.checked ? 1 : 0 }, 
      formModified: true 
    })
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
            value={car.model}
            onChange={handleFieldChange}
          />
          
          <TextField
            variant="outlined"
            name="color"
            label="Cor"
            fullWidth
            required
            select
            value={car.color}
            onChange={handleFieldChange}
          >
            {colorOptions.map(color => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            name="year_manufacture"
            label="Ano de fabricação"
            fullWidth
            required
            select
            value={car.year_manufacture}
            onChange={handleFieldChange}
          >
            {yearOptions.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <div className="MuiFormControl-root">
            <Checkbox
              checked={car.imported === 1}
              onChange={handleCheckboxChange}
              color="primary"
            />
            Importado
          </div>

          <InputMask
            mask="aaa-9A99"
            value={car.plates}
            onChange={handleFieldChange}
            formatChars={{
              'a': '[A-Za-z]', 
              '9': '[0-9]',     
              'A': '[A-J0-9]'  
            }}
          >
            {() => (
              <TextField
                variant="outlined"
                name="plates"
                label="Placas"
                fullWidth
                required
              />
            )}
          </InputMask>

          <TextField
            variant="outlined" 
            name="selling_price"
            label="Preço de venda"
            fullWidth
            value={car.selling_price}
            onChange={e => handleFieldChange({ target: { name: 'selling_price', value: e.target.value.replace(/\D/g, '') } })}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de venda"
              value={car.selling_date}
              onChange={date => handleFieldChange({ target: { name: 'selling_date', value: date } })}
              slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
            />
          </LocalizationProvider>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="contained" color="secondary" type="submit">Salvar</Button>
            <Button variant="outlined" onClick={() => navigate('..', { relative: 'path', replace: true })}>Voltar</Button>
          </Box>
        </form>
      </Box>
    </>
  )
}
