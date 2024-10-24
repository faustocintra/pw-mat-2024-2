import Typography from '@mui/material/Typography'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { feedbackWait, feedbackNotify } from '../../ui/Feedback';
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon  from '@mui/icons-material/DeleteForever';
import IconButton  from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function CustomersList() {

  const columns = [
    { 
      field: 'id', 
      headerName: 'Cód.', 
      width: 90 
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 200
    },
    {
      field: 'birth_date',
      headerName: 'Data Nasc.',
      width: 150
    },
    {
      field: 'municipality',
      headerName: 'Município/UF',
      width: 200,
      valueGetter: (value, row) => row.municipality + '/' + row.state
    },
    {
      field: 'phone',
      headerName: 'Fone/Celular',
      width: 160
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 200
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: params => {
       return <>
        <Link to={'./' + params.id}>
        <IconButton aria-label="editar">
          <EditIcon/>
        </IconButton>
        </Link>

        <IconButton aria-label="excluir">
          <DeleteForeverIcon color="error" />
        </IconButton>
        </>
      }
    },
  ];

  const [state, setState] = React.useState({
    customers: []
  })
  const {
    customers
  } = state

  React.useEffect(() => {
    loadData()
  }, [])  // vetor de dependências vazio, executa uma vez no mount

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch('https://api.faustocintra.com.br/v2/customers')
      const result = await response.json()

      setState({ ...state, customers: result })
    }
    catch (error) {
      console.log(error)
      alert('ERRO: ' + error.message, 'error')
    }
    finally{
      feedbackWait(false)
    }
  }

  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */ }
      <Typography variant="h1" gutterBottom>
        Listagem de clientes
      </Typography>
      <Paper elevation={8} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customers}
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