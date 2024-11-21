import Typography from '@mui/material/Typography'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'




export default function CarsList() {
  const columns = [
    {
      field: 'id',
      headerName: 'Cód.',
      width: 90
    },
    {
      field: 'brand_model',
      headerName: 'Marca/Modelo',
      width: 200,
      renderCell: (params) => `${params.row.brand} ${params.row.model}`
    },
    {
      field: 'year_manufacture',
      headerName: 'Ano de Fabricação',
      width: 150
    },
    {
      field: 'color',
      headerName: 'Cor',
      width: 150
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 120,
      renderCell: (params) => (params.value === 1 ? 'SIM' : '')
    },
    {
      field: 'plates',
      headerName: 'Placas',
      width: 150
    },
    {
      field: 'selling_price',
      headerName: 'Preço de Venda',
      width: 160,
     
        renderCell: (params) =>
        params.value && !isNaN(params.value)
          ? Number(params.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : ''

    },

    {
      field: 'selling_date',
      headerName: 'Data de Venda',
      width: 150,
      renderCell: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toLocaleDateString('pt-BR'); // Formata como dd/mm/yyyy
        }
        return '';
      }
    },


    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={'./' + params.id}>
            <IconButton aria-label="editar">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="excluir"
            onClick={() => handleDeleteButtonClick(params.id)}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </>
      )
    }
  ];

  const [state, setState] = React.useState({
    cars: []
  });
  const { cars } = state;

  React.useEffect(() => {
    loadData();
  }, []); // Executa uma vez no mount

  async function loadData() {
    feedbackWait(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE2 + '/cars?by=brand');
      const result = await response.json();

      setState({ ...state, cars: result });
    }
    catch (error) {
      console.log(error);
      feedbackNotify('ERRO: ' + error.message, 'error');
    }
    finally {
      feedbackWait(false);
    }
  }

  async function handleDeleteButtonClick(id) {
    if (await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true);
      try {
        await fetch(import.meta.env.VITE_API_BASE2 + `/cars/${id}`, { method: 'DELETE' });

        loadData(); // Atualiza os dados do DataGrid
        feedbackNotify('Exclusão efetuada com sucesso!');
      }
      catch (error) {
        console.log(error);
        feedbackNotify('ERRO: ' + error.message, 'error');
      }
      finally {
        feedbackWait(false);
      }
    }
  }

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Listagem de Veículos
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
        <Link to="./new">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Novo Veículo
          </Button>
        </Link>
      </Box>

      <Paper elevation={8} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  );
}
