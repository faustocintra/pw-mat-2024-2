import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputMask from 'react-input-mask';
import Checkbox from '@mui/material/Checkbox';

const colors = [
  { value: 'Preto', label: 'Preto' },
  { value: 'Branco', label: 'Branco' },
  { value: 'Prata', label: 'Prata' },
  { value: 'Vermelho', label: 'Vermelho' },
  { value: 'Azul', label: 'Azul' },
];

const years = Array.from(new Array(30), (_, index) => new Date().getFullYear() - index);

const plateMaskFormat = {
  a: '[A-Za-z]',
  9: '[0-9]',
  $: '[A-J]',
};

export default function CarsForm() {
  const [state, setState] = React.useState({
    Car: {
      brand: '',
      model: '',
      color: '',
      year_manufacture: '',
      imported: false,
      plates: '',
      selling_price: '',
    },
    formModified: false,
  });

  const { Car } = state;

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      Car: { ...Car, [name]: value },
      formModified: true,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Dados enviados:', Car);
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        mt: 3,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h1" gutterBottom>
        Cadastro de Veículos
      </Typography>

      {/* Campo Marca */}
      <TextField
        variant="filled"
        name="brand"
        label="Marca"
        fullWidth
        required
        value={Car.brand}
        onChange={handleFieldChange}
      />

      {/* Campo Modelo */}
      <TextField
        variant="filled"
        name="model"
        label="Modelo"
        fullWidth
        required
        value={Car.model}
        onChange={handleFieldChange}
      />

      {/* Campo Cor */}
      <TextField
        variant="filled"
        name="color"
        label="Cor"
        fullWidth
        required
        select
        value={Car.color}
        onChange={handleFieldChange}
      >
        {colors.sort((a, b) => a.label.localeCompare(b.label)).map((color) => (
          <MenuItem key={color.value} value={color.value}>
            {color.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Campo Ano de Fabricação */}
      <TextField
        variant="filled"
        name="year_manufacture"
        label="Ano de fabricação"
        fullWidth
        required
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

      {/* Campo Importado */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Checkbox
          checked={Car.imported}
          onChange={(event) =>
            setState({
              ...state,
              Car: { ...Car, imported: event.target.checked },
              formModified: true,
            })
          }
        />
        <Typography>Importado</Typography>
      </Box>

      {/* Campo Placa */}
      <InputMask
        mask="aaa-9$99"
        formatChars={plateMaskFormat}
        value={Car.plates}
        onChange={(event) =>
          setState({
            ...state,
            Car: { ...Car, plates: event.target.value.toUpperCase() },
            formModified: true,
          })
        }
      >
        {(inputProps) => (
          <TextField
            {...inputProps}
            variant="filled"
            name="plates"
            label="Placa"
            fullWidth
            required
          />
        )}
      </InputMask>

      {/* Campo Preço de Venda */}
      <TextField
        variant="filled"
        name="selling_price"
        label="Preço de venda"
        fullWidth
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={Car.selling_price}
        onChange={handleFieldChange}
      />

      {/* Botões */}
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!state.formModified}
        >
          Salvar
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={() => setState({ ...state, formModified: false })}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );
}
