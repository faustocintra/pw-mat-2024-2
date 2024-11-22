import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import foto from '../assets/foto-anajulia.jpeg'

export default function Autora() {
  
    //2.declarando variável de estado e usando lazy initializer
    const [likes, setLikes] = React.useState(() => {
      // busca o valor armazenado em 'likes' no localStorage.
      // se não houver valor, define o estado inicial como 0.
      const storedLikes = window.localStorage.getItem('likes');
      // retorna o valor armazenado (convertido para número) ou 0
      return storedLikes ? Number(storedLikes) : 0;
    });
  
    /* 10. recarrega a página e mostra o número de likes*/
    React.useEffect(() => {
      window.localStorage.setItem('likes', likes)
    }, [likes])
  
    return (
      <>
        <Typography variant="h1" gutterBottom>
          Sobre a autora
        </Typography>
  
        {/* 5. componente do tipo card */}
        <Card sx={{ maxWidth: 345 }}>

          {/* 6. upload da foto*/}
          <CardMedia
            sx={{ height: 345 }}
            image={foto}
            title="selfie"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Ana Júlia Andrade Barbosa
            </Typography>

            <Typography variant="body2" color="text.secondary">
            Aluna de Análise e Desenvolvimento de Sistemas, apaixonada por tecnologia.
            </Typography>
          </CardContent>
  
          {/* 9. Botao na seção cardActions */}
          <CardActions>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<FavoriteIcon />}
              onClick={() => setLikes(Number(likes) + 1)}
            >
              Curtir ({likes})
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }