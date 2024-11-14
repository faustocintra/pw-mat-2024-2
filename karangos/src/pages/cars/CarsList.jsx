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
      headerName: 'Marca e modelo',
      width: 200,
      renderCell: params => `${params.row.brand} ${params.row.model}`
      
    },
    {
      field: 'color',
      headerName: 'Cor',
      width: 200
    },
    {
      field: 'year_manufacture',
      headerName: 'Ano de fabricação',
      width: 200
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 200,

      renderCell: params => (params.value == 1 ? 'Sim' : 'Não') 
    },
    {
      field: 'plates',
      headerName: 'Placas',
      width: 200
    },
    {
      field: 'selling_price',
      headerName: 'Preço de venda',
      width: 200,

      renderCell: params => (params.value.toLocaleString(
        'pt-BR', {style: 'currency', currency: 'BRL'}
        ))
    },
    {
      field: 'selling_date',
      headerName: 'Data de venda',
      width: 200
    },
    
    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: params => {
        return <>
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
      }
    }
  ];

  const [state, setState] = React.useState({
    cars: []
  })
  const {
    cars: cars
  } = state

  React.useEffect(() => {
    loadData()
  }, [])  // Vetor de dependências vazio, executa uma vez no mount

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/cars?by=brand'
      )
      const result = await response.json()

      setState({ ...state, cars: result })
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
    if(await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true)
      try {
        // Envia a requisição para exclusão
        await fetch(
          import.meta.env.VITE_API_BASE + `/cars/${id}`,
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
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */ }
      <Typography variant="h1" gutterBottom>
        Listagem de Veículos
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
            startIcon={ <AddCircleIcon /> }
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