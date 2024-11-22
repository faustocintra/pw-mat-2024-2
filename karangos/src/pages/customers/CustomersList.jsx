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


export default function CustomersList() {

  const columns = [
    {
      field: 'id',
      headerName: 'Cód.',
      width: 30
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 220
    },


    {
      field: 'ident_document',
      headerName: 'CPF',
      width: 130
    },


    {
      field: 'birth_date',
      headerName: 'Data Nasc.',
      width: 100,
      valueGetter: (value, row) => {
        if (value) {
          const date = new Date(value)
          return date.toLocaleDateString('pt-BR')
        }
      }
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
      width: 130
    },

    {
      field: 'email',
      headerName: 'E-mail',
      width: 240
    },

    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: params => {

        return <>
          <Link to={'./' + params.id}>
            <IconButton
              aria-label="editar"
            >
              <EditIcon />
            </IconButton>

          </Link>

          <IconButton aria-label="excluir"
            onClick={() => handleDeleteButtonClick(params.id)}
          >
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
  }, [])  // Vetor de dependências vazio, executa uma vez no mount

  async function loadData() {
    feedbackWait(true)
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + '/customers?by=name'
      )
      const result = await response.json()

      //console.log('Dados retornados da API:', result); 

      setState({ ...state, customers: result })
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
    console.log("ID recebido para exclusão:", id);
    if (await feedbackConfirm('Deseja realmente excluir este item?')) {
      feedbackWait(true);
      try {
        // Faz a requisição DELETE para o backend
        const response = await fetch(import.meta.env.VITE_API_BASE + `/${id}`, { method: 'DELETE' });
        console.log("response:", response);
        console.log("response status:", response.status);
        console.log("response statusText:", response.statusText);
        console.log("response body:", await response.text());

        // Verifica se a resposta foi bem-sucedida (status 200 ou 204)
        if (!response.ok) {
          throw new Error('Falha ao excluir o item');
        }

        else {

          await loadData();  // Chama novamente o loadData após exclusão

          feedbackNotify('Exclusão efetuada com sucesso!');
        }

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
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        Listagem de clientes
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'right', //Alinhando à direita
        mb: 2 //Margem inferior (margin-bottom)
      }} >
        <Link to=".new">
          <Button variant="contained"
            size="large"
            color="secondary"
            startIcon={< AddCircleIcon />}>
            Novo Cliente
          </Button>
        </Link>
      </Box>

      <Paper elevation={8} sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 7 }
            },
          }}
          pageSizeOptions={[5]}
          //checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}