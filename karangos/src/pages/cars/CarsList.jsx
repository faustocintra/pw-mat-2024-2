import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, Box, Button, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  // Função para carregar os dados dos carros
  const loadCars = async () => {
    feedbackWait(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/cars?by=id`);
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error(error);
      feedbackNotify(`Erro ao carregar os dados: ${error.message}`, 'error');
    } finally {
      feedbackWait(false);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadCars();
  }, []);

  // Função para deletar um carro
  const handleDelete = async (id) => {
    const isConfirmed = await feedbackConfirm('Tem certeza de que deseja excluir este carro?');
    if (isConfirmed) {
      feedbackWait(true);
      try {
        await fetch(`${import.meta.env.VITE_API_BASE}/cars/${id}`, { method: 'DELETE' });
        loadCars();
        feedbackNotify('Carro excluído com sucesso!');
      } catch (error) {
        console.error(error);
        feedbackNotify(`Erro ao excluir: ${error.message}`, 'error');
      } finally {
        feedbackWait(false);
      }
    }
  };

  // Configuração das colunas do DataGrid
  const columns = [
    { field: 'id', headerName: 'Cód', width: 90 },
    {
      field: 'brandAndModel',
      headerName: 'Marca e Modelo',
      width: 200,
      renderCell: (params) => (
        <span>{`${params.row.brand || ''} ${params.row.model || ''}`}</span>
      ),
    },
    { field: 'color', headerName: 'Cor', width: 150 },
    { field: 'year_manufacture', headerName: 'Ano de Fabricação', width: 160 },
    {
      field: 'imported',
      headerName: 'Carro Importado',
      width: 200,
      renderCell: (params) => (params.row.imported === 1 ? 'Sim' : 'Não'),
    },
    { field: 'plates', headerName: 'Placa', width: 200 },
    {
      field: 'selling_date',
      headerName: 'Data de Venda',
      width: 200,
      renderCell: (params) =>
        params.row.selling_date ? new Date(params.row.selling_date).toLocaleDateString('pt-BR') : 'Não Vendido',
    },
    {
      field: 'selling_price',
      headerName: 'Preço de Venda',
      width: 200,
      renderCell: (params) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(params.row.selling_price || 0),
    },
    {
      field: '_actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Link to={`./${params.id}`}>
            <IconButton aria-label="Editar">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="Excluir" onClick={() => handleDelete(params.id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Lista de Carros
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Link to="./new">
          <Button variant="contained" size="large" color="secondary" startIcon={<AddCircleIcon />}>
            Novo Carro
          </Button>
        </Link>
      </Box>

      <Paper elevation={8} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={cars}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default CarsList;
