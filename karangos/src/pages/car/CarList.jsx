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
export default function CarList() {

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      width: 100,
      type: "number"
    },
    {
      field: 'brand',
      headerName: 'Marca',
      width: 200,
      renderCell: params => (
        <div>
          {`${params.row.brand} / ${params.row.model}`}
        </div>
      )
    },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 150,
    },
    {
      field: 'color',
      headerName: 'Cor',
      width: 125,
    },
    {
      field: 'year_manufacture',
      headerName: 'Ano de Fabricação',
      width: 160
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 150,
      renderCell: params => (
        params.value == 1 ? "SIM" : ""
      )
    },
    {
      field: 'plates',
      headerName: 'Placas',
      width: 150
    },
    {
      field: 'selling_price',
      headerName: 'Preço de Venda',
      width: 200,
      valueGetter: (value) => Number(value).toLocaleString(
        'pt-BR', { style: 'currency', currency: 'BRL' }
      )
    },
    {
      field: '_edit',
      headerName: 'Editar',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      sortable: false,
      renderCell: params => (
        <Link to={'./' + params.id}>
          <IconButton aria-label="Editar">
            <EditIcon />
          </IconButton>
        </Link>
      )
    },
    {
      field: '_delete',
      headerName: 'Excluir',
      headerAlign: 'center',
      align: 'center',
      width: 90,
      sortable: false,
      renderCell: params => (
        <IconButton aria-label="Excluir" onClick={() => handleDeleteButtonClick(params.id)}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      )
    },
  ]

  const [state, setState] = React.useState({
    car: []
  })
  const {
    car
  } = state

  React.useEffect(() => {
    loadData()
  }, [])  // Vetor de dependências vazio, executa uma vez no mount

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/car?by=name'
      )
      const result = await response.json()

      setState({ ...state, car: result })
    }
    catch (error) {
      console.log(error)
      feedbackNotify('ERRO: ' + error.message, 'error')
    }
    finally {
      feedbackWait(false)
    }
  }

  async function handleDeleteButtonClick(id) {
    if (await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true)
      try {
        // Envia a requisição para exclusão
        await fetch(
          import.meta.env.VITE_API_BASE + `/car${id}`,
          { method: 'DELETE' }
        )

        // Atualiza os dados do datagrid
        loadData()

        feedbackNotify('Exclusão efetuada com sucesso.')
      }
      catch (error) {
        console.log(error)
        feedbackNotify('ERRO: ' + error.message, 'error')
      }
      finally {
        feedbackWait(false)
      }
    }
  }

  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        Listagem de clientes
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'right', // Alinhado à direita
        mb: 2   // Margem inferior (margin-bottom)
      }}>
        <Link to="./new">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Novo cliente
          </Button>
        </Link>
      </Box>

      <Paper elevation={8} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={car}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}