import Typography from '@mui/material/Typography'
import * as React from 'react'
import Paper from '@mui/material/Paper'
import { DataGrid } from '@mui/x-data-grid'
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
    { field: 'id', 
      headerName: 'Cód.', 
      width: 90 
    },
    {
      field: 'brand_model',
      headerName: 'Marca/Modelo',
      width: 200,
      valueGetter: (params) => 
        `${params.row.brand & ''} 
         ${params.row.model & ''} 
        `
        .trim(),
    },
    
    {
      field: 'selling_date',
      headerName: 'Ano de Fabricação',
      width: 150,
      valueGetter: (params) => {
        const date = params.row.selling_date ? new Date(params.row.selling_date) : null
        return date ? date.toLocaleDateString('pt-BR') : ''
      },
    },
    { 
      field: 'color', 
      headerName: 'Cor', 
      width: 160 
    },
    {
      field: 'imported',
      headerName: 'Importado',
      width: 200,
      editable: true,
        type: 'boolean',
    },
    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Link to={`./${params.row.id}`} key={`edit-${params.row.id}`}>
            <IconButton aria-label="editar">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="excluir"
            key={`delete-${params.row.id}`}
            onClick={() => handleDeleteButtonClick(params.row.id)}
          >
            <DeleteForeverIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ]

  const [state, setState] = React.useState({
    cars: []
  })

  const { 
    cars 
  } = state

  React.useEffect(() => {
    loadData()
  }, []) 

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/cars?by=name'       
      )
      const result = await response.json()

      setState({...state, cars: result })
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

        await fetch(import.meta.env.VITE_API_BASE + `/cars/${id}`, {
          method: 'DELETE'
        })

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
      <Typography variant="h1" gutterBottom>
        Lista de Carros
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right', // Alinhado à direita
          mb: 2, // Margem inferior (margin-bottom)
        }}
      >
        <Link to="./new">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<AddCircleIcon />}
          >
            Novo Carro
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