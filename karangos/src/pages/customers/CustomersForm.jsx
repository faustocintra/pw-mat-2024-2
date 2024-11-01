
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
import { emphasize } from '@mui/material'
import InputMask from 'react-input-mask'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import {useNavigate} from 'react-router-dom'

export default function CustomersForm() {
  /*
    "id": 344,  
    "name": "Etelvina Eanes Essado",
    "ident_document": "333.333.333-33",
    "birth_date": "1957-7-7",
    "street_name": "Rua do Sobe e Desce",
    "house_number": "333",
    "complements": null,
    "district": "Centro",
    "municipality": "Pequenópolis",
    "state": "SP",
    "phone": "(16) 3333-3333",
    "email": "etel.eanes@gmail.com"
  */

  const brazilianStates = [
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PR', label: 'Parána' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'SP', label: 'São Paulo' },

  ]

  const phoneMaskFormatChars = {
    '9': '[0-9]',                // Somente digitos
    '%': '[\s0-9]'              //  digitos ou espaço em branco (\s)
  }

  const formDefaults = {
    name: '',
    ident_document: '',
    birth_date: null,
    street_name: '',
    house_number: '',
    complements: '',
    district: '',
    municipality: '',
    state: '',
    phone: '',
    email: ''
  }

  const Navigate = useNavigate()

  const [state, setState] = React.useState({
    customer: { ...formDefaults }
  })
  const {
    customer
  } = state
  /*  
    Preenche o campo do objeto customers conforme 
    o campo correspondente do formulário por 
    modificado
  */
  function handleFieldChange(event) {
    //  Vamos observar no console as informações que chegam
    //  a fundo handleFieldChange
    console.log({ name: event.target.name, value: event.target.value })

    // Tira uma cópia da variavel de estado customer
    const customerCopy = { ...customer }
    // Altera em customerCopy apenas o campo da vez
    customerCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // customer por sua cópia atualizada
    setState({ ...state, customer: customerCopy })
  }

  async function handleFormSubmit(event){
    event.preventDefault()             // Impede o carregamento da página
    feedbackWait(true)
    try{
      //  Prepara as opções para o fetch 
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(customer)

      }

      //  invoca o fetch para enviar os dados do back-end

      await fetch(
        import.meta.env.VITE_API_BASE + '/customers',
        reqOptions
      )

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () =>{
        //  Retorna para a página de listagem
        Navigate('..', {relative: 'path', replace: true})
      })

    }
    catch(error){
      console.log(error)
      feedbackNotify('Erro: ' + error.message, 'error')

    }
    finally{
      feedbackWait(false)
    }
  }
  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        Cadastro de clientes
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}> 
          {/* autoFocus = Foco do teclado no primeiro campo */}
          <TextField
            variant="outlined"
            name="name"
            label="Nome Completo"
            fullWidth
            required
            autoFocus
            value={customer.name}
            onChange={handleFieldChange}
          />

          <InputMask
            mask="999.999.999-99"
            value={customer.ident_document}
            onChange={handleFieldChange}
          >
            {
              () =>
                <TextField
                  variant="outlined"
                  name="ident_document"
                  label="CPF"
                  fullWidth
                  required
                />
            }
          </InputMask>
          {/*
            O evento onChange do componente DatePicker não passa 
            o parâmetro event, como no TextField, e sim a própira 
            data que foi modificada. Por isso, ao chamar a função 
            handleFieldChange no DataPicker, precisamos criar um 
            parâmetro event "fake" com as informações necessárias
          */}
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker
              label="Data de nascimento"
              value={customer.birth_date}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true
                }
              }}
              onChange={date => {
                const event = {target:{ name: 'birth_date', value: date } }
                handleFieldChange(event)
              }}
            />
          </LocalizationProvider>

          <TextField
            variant="outlined"
            name="street_name"
            label="Logradouro (Rua, Av., etc."
            fullWidth
            required
            value={customer.street_name}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="house_number"
            label="Nº"
            fullWidth
            required
            value={customer.house_number}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="complements"
            label="Complemento"
            fullWidth
            /*required*/
            value={customer.complements}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="district"
            label="Bairro"
            fullWidth
            required
            value={customer.district}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="municipality"
            label="Municipio"
            fullWidth
            required
            value={customer.municipality}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="state"
            label="UF"
            fullWidth
            required
            value={customer.state}
            select
            onChange={handleFieldChange}
          >
            {
              brazilianStates.map(s =>
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              )
            }
          </TextField>

          <InputMask
            formatChars={phoneMaskFormatChars}
            mask="(99) %9999-9999"
            value={customer.phone}
            maskChar=" "
            onChange={handleFieldChange}
          >
            {
              () =>
                <TextField
                  variant="outlined"
                  name="phone"
                  label="Telefone/Celular"
                  fullWidth
                  required
                  value={customer.phone}
                  onChange={handleFieldChange}
                />
            }
          </InputMask>

          <TextField
            variant="outlined"
            name="email"
            label="E-mail"
            fullWidth
            required
            value={customer.email}
            onChange={handleFieldChange}
          />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
          }}>
            <Button
              variant='contained'
              color='secondary'
              type='submit'
            >
              Salvar
            </Button>

            <Button
              variant='outlined'
            >
              Voltar</Button>

          </Box>

          <Box sx={{
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw'
          }}>
            {JSON.stringify(customer, null, ' ')}

          </Box>

        </form>
      </Box>
    </>
  )
}
