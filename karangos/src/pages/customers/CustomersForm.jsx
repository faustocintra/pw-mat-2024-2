
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

  const formDefaults = {
    name:'',
    ident_document: '',
    birth_date: null,
    street_name: '',
    house_number: '',
    complements:'',
    district:'',
    municipality:'',
    state:'',
    phone:'',
    email:''
  }

  const [state, setState] = React.useState({
    customer: {...formDefaults}
  })
  const {
    customer
  } = state
  /*  
    Preenche o campo do objeto customers conforme 
    o campo correspondente do formulário por 
    modificado
  */
  function handleFieldChange(event){
    // Tira uma cópia da variavel de estado customer
    const customerCopy = {...customer}
    // Altera em customerCopy apenas o campo da vez
    customerCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // customer por sua cópia atualizada
    setState({...state, customer:customerCopy})
  }
  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        Cadastro de clientes
      </Typography>

      <Box className="form-fields">
        <form>
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
          <TextField
            variant="outlined"
            name="ident_document"
            label="CPF"
            fullWidth
            required
            value={customer.ident_document}
            onChange={handleFieldChange}
          />

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

          <TextField
            variant="outlined"
            name="phone"
            label="Telefone/Celular"
            fullWidth
            required
            value={customer.phone}
            onChange={handleFieldChange}
          />

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
            fontFamily:'monospace',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}>
          {JSON.stringify(customer)}
        
          </Box>

        </form>
      </Box>
    </>
  )
}
