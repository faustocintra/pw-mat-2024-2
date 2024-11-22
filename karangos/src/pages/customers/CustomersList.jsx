import React from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Paper, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback';

const CustomersList = () => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    feedbackWait(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/customers?by=name`);
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      feedbackNotify(`Erro: ${error.message}`, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await feedbackConfirm('Deseja excluir este cliente?');
    if (confirmed) {
      feedbackWait(true);
      try {
        await fetch(`${import.meta.env.VITE_API_BASE}/customers/${id}`, { method: 'DELETE' });
        fetchData();
        feedbackNotify('Cliente excluído com sucesso.');
      } catch (error) {
        feedbackNotify(`Erro: ${error.message}`, 'error');
      } finally {
        feedbackWait(false);
      }
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Código',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 220,
    },
    {
      field: 'birth_date',
      headerName: 'Data Nasc.',
      width: 180,
      valueGetter: ({ value }) => value ? new Date(value).toLocaleDateString('pt-BR') : '',
    },
    {
      field: 'municipality',
      headerName: 'Município/UF',
      width: 220,
      valueGetter: ({ row }) => `${row.municipality}/${row.state}`,
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 170,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 220,
    },
    {
      field: '_actions',
      headerName: 'Ações',
      width: 180,
      sortable: false,
      renderCell: ({ id }) => (
        <>
          <Link to={`./${id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Clientes Cadastrados
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Link to="./new">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Adicionar Cliente
          </Button>
        </Link>
      </Box>

      <Paper elevation={8} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default CustomersList;
