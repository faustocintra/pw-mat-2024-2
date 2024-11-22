import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale/pt-BR';
import { parseISO } from 'date-fns';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback';
import { useNavigate, useParams } from 'react-router-dom';

export default function CustomersForm() {
  const brazilianStates = [
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PR', label: 'Paraná' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'SP', label: 'São Paulo' }
  ];

  const phoneMaskFormatChars = {
    '9': '[0-9]',
    '%': '[\s0-9]' // dígitos ou espaço em branco
  };

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
  };

  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = useState({
    customer: { ...formDefaults },
    formModified: false
  });

  const { customer, formModified } = state;

  useEffect(() => {
    if (params.id) loadData();
  }, [params.id]);

  const loadData = async () => {
    feedbackWait(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE + '/customers/' + params.id);
      const result = await response.json();

      if (result.birth_date) {
        result.birth_date = parseISO(result.birth_date);
      }

      setState({ customer: result, formModified: false });
    } catch (error) {
      console.error(error);
      feedbackNotify('Erro: ' + error.message, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    const updatedCustomer = { ...customer, [name]: value };
    setState({ customer: updatedCustomer, formModified: true });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    feedbackWait(true);

    try {
      const method = params.id ? 'PUT' : 'POST';
      const url = params.id
        ? import.meta.env.VITE_API_BASE + '/customers/' + params.id
        : import.meta.env.VITE_API_BASE + '/customers/';

      const reqOptions = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
      };

      await fetch(url, reqOptions);

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true });
      });
    } catch (error) {
      console.error(error);
      feedbackNotify('Erro: ' + error.message, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  const handleBackButtonClick = async () => {
    if (formModified && !(await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?'))) return;
    navigate('..', { relative: 'path', replace: true });
  };

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar cliente #${params.id}` : 'Cadastrar novo cliente'}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>
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

          <InputMask mask="999.999.999-99" value={customer.ident_document} onChange={handleFieldChange}>
            {() => (
              <TextField variant="outlined" name="ident_document" label="CPF" fullWidth required />
            )}
          </InputMask>

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de nascimento"
              value={customer.birth_date}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true
                }
              }}
              onChange={(date) => handleFieldChange({ target: { name: 'birth_date', value: date } })}
            />
          </LocalizationProvider>

          <TextField
            variant="outlined"
            name="street_name"
            label="Logradouro (Rua, Av., etc.)"
            fullWidth
            required
            value={customer.street_name}
            onChange={handleFieldChange}
          />

          <TextField
            variant="outlined"
            name="house_number"
            label="Número"
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
            label="Município"
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
            {brazilianStates.map((state) => (
              <MenuItem key={state.value} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </TextField>

          <InputMask
            formatChars={phoneMaskFormatChars}
            mask="(99) %9999-9999"
            value={customer.phone}
            maskChar=" "
            onChange={handleFieldChange}
          >
            {() => <TextField variant="outlined" name="phone" label="Telefone/Celular" fullWidth required />}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="contained" color="secondary" type="submit">
              Salvar
            </Button>

            <Button variant="outlined" onClick={handleBackButtonClick}>
              Voltar
            </Button>
          </Box>

          <Box sx={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column', width: '100vw' }}>
            {JSON.stringify(customer, null, ' ')}
          </Box>
        </form>
      </Box>
    </>
  );
}
