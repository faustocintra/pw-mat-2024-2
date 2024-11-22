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



import MaskedInput from 'react-text-mask';

//import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function CustomersForm() {

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

  const brazilianStates = [
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PR', label: 'Paraná' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'SP', label: 'São Paulo' }
  ]





  const navigate = useNavigate()
  const params = useParams()



  //CUSTOMER
  const [state, setState] = React.useState({
    customer: { ...formDefaults },
    formModified: false
  })


  const { customer, formModified } = state


  //PARAMS
  React.useEffect(() => {
    if (params.id) loadData()
  }, [])

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/' + params.id
      )
      const result = await response.json()

      // Converte o formato da data armazenado no banco de dados
      // para o formato reconhecido pelo componente DatePicker
      //if (result.birth_date) result.birth_date = parseISO(result.birth_date)

      setState({ ...params, customer: result })
    }
    catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  /*
    Preenche o campo do objeto customer conforme
    o campo correspondente do formulário for
    modificado
  */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam
    // à função handleFieldChange
    console.log({ name: event.target.name, value: event.target.value })

    // Tira uma cópia da variável de estado customer
    const customerCopy = { ...customer }
    // Altera em customerCopy apenas o campo da vez
    customerCopy[event.target.name] = event.target.value
    // Atualiza a variável de estado, substituindo o objeto
    // customer por sua cópia atualizada
    setState({ ...state, customer: customerCopy, formModified: true })
  }



  async function handleFormSubmit(event) {
    event.preventDefault()      // Impede o recarregamento da página

    feedbackWait(true)
    try {

      // Filtra os campos do objeto 'customer', removendo valores 'null' ou strings vazias
      /*const filteredCustomer = Object.fromEntries(
        Object.entries(customer).filter(([_, value]) => value !== null && value !== '')
      );*/




      const filteredCustomer = { ...customer }; // Envia todos os campos

      // Adicionando um log para verificar a data antes do envio
      console.log('Dados antes do envio para a API:', filteredCustomer);

      // Se a data de nascimento no objeto 'customer' estiver no formato errado, podemos ajustá-la
      if (customer.birth_date) {
        const date = new Date(customer.birth_date);
        filteredCustomer.birth_date = date.toISOString(); // Converte a data para o formato ISO padrão
      }

      console.log('filteredCustomer com a data corrigida:', filteredCustomer);



      // Prepara as opções para o fetch
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredCustomer)
      }

      // Infoca o fetch para enviar os dados ao back-end.
      // Se houver parâmetro na rota, significa que estamos alterando
      // um registro existente e, portanto, o verbo precisa ser PUT
      if (params.id) {
        reqOptions.method = 'PUT'
        await fetch(
          `${import.meta.env.VITE_API_BASE}/${params.id}`, // Usa o ID para identificar o carro
          reqOptions
        );
      }
      // Senão, envia com o método POST para criar um novo registro
      else {
        await fetch(
          import.meta.env.VITE_API_BASE + '/customers',
          reqOptions
        )
      }

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        // Retorna para a página de listagem
        navigate('..', { relative: 'path', replace: true })
      })

    }
    catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }




  async function handleBackButtonClick() {
    if (
      formModified &&
      ! await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?')
    ) return // Sai da função sem fazer nada

    // Aqui o usuário respondeu que quer voltar e perder os dados
    navigate('..', { relative: 'path', 'replace': true })
  }

  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar cliente #${params.id}` : 'Cadastrar novo cliente'}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          {/* TELEFONE */}
          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField
            variant="outlined"
            name="name"
            label="Nome completo"
            fullWidth
            required
            autoFocus
            value={customer.name}
            onChange={handleFieldChange}
          />


          {/* CPF */}
          <MaskedInput
            mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            placeholder="Digite o CPF"
            guide={false} // Evita preencher automaticamente a máscara
            value={customer.ident_document}
            onChange={handleFieldChange}
            render={(ref, props) => (
              <TextField
                {...props} // Passa as propriedades do MaskedInput
                inputRef={ref} // Ref necessário para integração com MaskedInput
                variant="outlined"
                name="ident_document"
                label="CPF"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // Força o rótulo a sempre subir
                }}
              />
            )}
          />




          {/* DATA DE NASCIMENTO */}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Nascimento"
              value={customer.birth_date && !isNaN(new Date(customer.birth_date)) ? new Date(customer.birth_date) : null}
              onChange={(date) => {
                // Formata a data para 'YYYY-MM-DD'
                const formattedDate = date ? date.toISOString().split('T')[0] : null;
                const event = { target: { name: 'birth_date', value: formattedDate } }; // Nome correto do campo
                handleFieldChange(event);
              }}
              slots={{ textField: (params) => <TextField {...params} variant="outlined" fullWidth helperText="Opcional" /> }}
            />
          </LocalizationProvider>






          {/* LOGRADOURO*/}
          <TextField
            variant="outlined"
            name="street_name"
            label="Logradouro (Rua, Av., etc.)"
            fullWidth
            required
            value={customer.street_name}
            onChange={handleFieldChange}
          />


          {/* HOUSE NUMBER */}
          <TextField
            variant="outlined"
            name="house_number"
            label="nº"
            fullWidth
            required
            value={customer.house_number}
            onChange={handleFieldChange}
          />

          {/* COMPLEMENTO */}
          <TextField
            variant="outlined"
            name="complements"
            label="Complemento"
            fullWidth
            /* required */
            value={customer.complements}
            onChange={handleFieldChange}
          />

          {/* BAIRRO */}
          <TextField
            variant="outlined"
            name="district"
            label="Bairro"
            fullWidth
            required
            value={customer.district}
            onChange={handleFieldChange}
          />


          {/* MUNICÍPIO */}
          <TextField
            variant="outlined"
            name="municipality"
            label="Município"
            fullWidth
            required
            value={customer.municipality}
            onChange={handleFieldChange}
          />


          {/* UF */}
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





          {/* TELEFONE */}
          <MaskedInput
            mask={[
              '(', /\d/, /\d/, ')', ' ',
              /[\s0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/
            ]}
            placeholder="(99) 99999-9999"
            guide={false} // Evita preencher automaticamente a máscara
            value={customer.phone}
            onChange={(event) => {
              const updatedValue = event.target.value;
              handleFieldChange({ target: { name: 'phone', value: updatedValue } });
            }}
            render={(ref, props) => (
              <TextField
                {...props} // Passa as propriedades do MaskedInput
                inputRef={ref} // Ref necessário para integração com MaskedInput
                variant="outlined"
                name="phone"
                label="Telefone/Celular"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // Força o rótulo a sempre subir
                }}
              />
            )}
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
            {JSON.stringify(customer, null, ' ')}
          </Box>

        </form>
      </Box >

    </>
  )
}