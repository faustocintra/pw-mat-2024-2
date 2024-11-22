import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import InputMask from 'react-input-mask'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FormControlLabel } from '@mui/material'

export default function CarsForm() {
  

  const colors = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Vermelho', label: 'Vermelho' },
  ];
  
  const platesMaskFormatChars = {
    '9': '[0-9]', 
    'a': '[A-Za-z]',  
    '$': '[A-J0-9]',  
  };

  const formDefaults = {
    id: 0,
    brand: "",
    model: "",
    color: "",
    year_manufacture: "",
    imported: "",
    plates: "",
    selling_price: "",
    selling_date: ""
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, i) => currentYear - i);

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })
  const {
    car,
    formModified
  } = state

  React.useEffect(() => {

    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_TRABALHO + '/customers/' + params.id 
      )
      const result = await response.json()

      if(result.birth_date) result.birth_date = parseISO(result.birth_date)

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

  function handleFieldChange(event) {

    // Tira uma cópia da variável de estado customer
    const carCopy = { ...car }
    // Altera em customerCopy apenas o campo da vez
    carCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // car por sua cópia atualizada
    setState({ ...state, car: carCopy, formModified: true })
  }

  const [carr, setCarr] = useState(formDefaults);
    
    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setCarr((prev) => ({ ...prev, [name]: checked }));
    };

  async function handleFormSubmit(event) {
    event.preventDefault()     // Impede o recarregamento da página

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
          import.meta.env.VITE_API_TRABALHO + '/' + params.id,
          reqOptions
        )
      }
      // Senão, envia com o método POST para criar um novo registro
      else {
        await fetch(
         import.meta.env.VITE_API_TRABALHO + '/' + params.id,
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
        { params.id ? `Editar veículo #${params.id}` : 'Cadastrar novo veículo' }
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          {/* Campo Marca */}
      <TextField
        variant="outlined"
        name="brand"
        label="Marca"
        fullWidth
        required
        value={car.brand}
        onChange={handleFieldChange}
      />

      {/* Campo Modelo */}
      <TextField
        variant="outlined"
        name="model"
        label="Modelo"
        fullWidth
        required
        value={car.model}
        onChange={handleFieldChange}
      />

      {/* Campo Cor */}
      <TextField
        variant="outlined"
        name="color"
        label="Cor"
        fullWidth
        required
        value={car.color}
        select
        onChange={handleFieldChange}
      >
        {colors.map((color) => (
          <MenuItem key={color.value} value={color.value}>
            {color.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Campo Ano de Fabricação */}
      <TextField
        variant="outlined"
        name="year_manufacture"
        label="Ano de Fabricação"
        fullWidth
        required
        value={car.year_manufacture}
        select
        onChange={handleFieldChange}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      {/* Campo Placas */}
      <InputMask
        mask="aaa-9$99"
        formatChars={platesMaskFormatChars}
        value={car.plates}
        onChange={handleFieldChange}
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

      {/* Checkbox Importado */}
      <FormControlLabel
        control={
          <Checkbox
            name="imported"
            checked={car.imported}
            onChange={handleCheckboxChange}
          />
        }
        label="Importado"
      />

      {/* Campo Preço de Venda */}
      <TextField
        variant="outlined"
        name="selling_price"
        label="Preço de Venda"
        fullWidth
        required
        type="number"
        value={car.selling_price}
        onChange={handleFieldChange}
      />

      {/* Campo Data de Venda */}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <DatePicker
          label="Data de Venda"
          value={car.selling_date}
          onChange={(date) => {
            const event = { target: { name: 'selling_date', value: date } };
            handleFieldChange(event);
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              fullWidth: true,
            },
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
