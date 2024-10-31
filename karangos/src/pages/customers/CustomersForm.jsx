import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

  const [state, setState] = React.useState({
    customer: {},
  });
  const { customer } = state;

  return (
    <>
      {/* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        Cadastro de clientes
      </Typography>

      <Box className="form-fields">
        <form>
          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField
            variant="outlined"
            name="name"
            label="Nome completo"
            fullWidth
            required
            autoFocus
            value={customer.name}
          />

          <TextField
            variant="outlined"
            name="ident_document"
            label="CPF"
            fullWidth
            required
            value={customer.ident_document}
          />
        </form>
      </Box>
    </>
  );
}
