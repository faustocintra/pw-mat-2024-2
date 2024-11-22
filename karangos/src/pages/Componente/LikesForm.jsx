import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'; // Para o título e texto
import Card from '@mui/material/Card'; // Para o cartão
import CardContent from '@mui/material/CardContent'; // Conteúdo do cartão
import CardActions from '@mui/material/CardActions'; // Ações do cartão (botões)
import Button from '@mui/material/Button'; // O botão de Curtir
import { CardMedia } from '@mui/material'; // Para adicionar a imagem no Card

export default function ImgMediaCard() {
  // Lazy initialization do contador de likes
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem('likes');
    return savedLikes ? JSON.parse(savedLikes) : 0; // Inicializa com o valor de localStorage ou 0
  });

  // Efeito colateral para atualizar o localStorage quando o contador de likes mudar
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  // Função para incrementar o contador de likes
  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Imagem de Leonardo Abelo"
        height="140"
        image="/download.jfif" 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Leonardo Abelo
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Leonardo Abelo é um autor renomado, com diversas publicações que abordam temas profundos sobre a vida, sociedade e o ser humano.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLike}>
          Curtir ({likes})
        </Button>
      </CardActions>
    </Card>
  );
}