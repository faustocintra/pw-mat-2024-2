import React, { useEffect, useState } from 'react'
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
import { FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { pink, yellow } from '@mui/material/colors';

const CarsForm = () => {

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 }, (_, i) => currentYear - i);

  const carsColors = [
    { value: 'Amarelo', label: 'Amarelo' },
    { value: 'Azul', label: 'Azul' },
    { value: 'Bege', label: 'Bege' },
    { value: 'Branco', label: 'Branco' },
    { value: 'Cinza', label: 'Cinza' },
    { value: 'Laranja', label: 'Laranja' },
    { value: 'Marrom', label: 'Marrom' },
    { value: 'Preto', label: 'Preto' },
    { value: 'Prata', label: 'Prata' },
    { value: 'Verde', label: 'Verde' },
    { value: 'Vermelho', label: 'Vermelho' },
  ];

  const plateMaskFormatChars = {
    '9': '[0-9]',    // somente dígitos
    'A': '[A-Z]',    // somente letras maiúsculas
    '$': '[A-J0-9]'   // letras de A a J e dígitos
  };

  const formDefaults = {
    brand: "",
    model: "",
    color: "",
    year_manufacture: "",
    imported: 0,
    plates: '',
    selling_price: 0,
    selling_date: null
  };

  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = useState({
    car: { ...formDefaults },
    formModified: false
  });

  const { car, formModified } = state;

  useEffect(() => {
    if (params.id) loadData();
  }, []);

  const loadData = async () => {
    feedbackWait(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/cars/${params.id}`
      );
      const result = await response.json();

      if (result.selling_date) result.selling_date = parseISO(result.selling_date);
      setState({ car: result, formModified: false });
    } catch (error) {
      feedbackNotify(`ERRO: ${error.message}`, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      car: { ...prevState.car, [name]: value },
      formModified: true
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    feedbackWait(true);

    try {
      const reqOptions = {
        method: params.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car)
      };

      const endpoint = params.id
        ? `${import.meta.env.VITE_API_BASE}/cars/${params.id}`
        : `${import.meta.env.VITE_API_BASE}/cars/`;

      await fetch(endpoint, reqOptions);

      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        navigate('..', { relative: 'path', replace: true });
      });
    } catch (error) {
      feedbackNotify(`ERRO: ${error.message}`, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  const handleBackButtonClick = async () => {
    if (formModified && !(await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?'))) {
      return;
    }
    navigate('..', { relative: 'path', replace: true });
  };

  return (
    <>
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar carro #${params.id}` : 'Cadastrar carro'}
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
            label="Modelo do carro"
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
            value={car.color}
            select
            onChange={handleFieldChange}
          >
            {carsColors.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            variant="outlined"
            name="year_manufacture"
            label="Ano de fabricação"
            fullWidth
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

          <FormControl sx={{ width: '100%' }}>
            <FormControlLabel
              label="Carro importado"
              sx={{
                display: 'inline-flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-around',
              }}
              control={
                <Checkbox
                  sx={{
                    color: yellow[600],
                    '&.Mui-checked': {
                      color: pink['A200'],
                    },
                  }}
                  name="imported"
                  checked={car.imported}
                  onChange={(event) =>
                    handleFieldChange({
                      target: {
                        name: event.target.name,
                        value: event.target.checked,
                      },
                    })
                  }
                />
              }
            />
          </FormControl>

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
            variant="outlined"
            name="selling_price"
            label="Valor de venda"
            fullWidth
            type="number"
            value={car.selling_price}
            onChange={handleFieldChange}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data da venda"
              value={car.selling_date}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true,
                },
              }}
              onChange={(date) => handleFieldChange({ target: { name: 'selling_date', value: date } })}
            />
          </LocalizationProvider>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="contained" color="secondary" type="submit">
              Salvar
            </Button>

            <Button variant="outlined" onClick={handleBackButtonClick}>
              Voltar
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default CarsForm;
