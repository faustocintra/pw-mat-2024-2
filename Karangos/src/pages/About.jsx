import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import foto from '../assets/foto.jpg'

export default function About() {

  const [likes, setLikes] = React.useState(
    () => window.localStorage.getItem('likes') ?? 0
  )

  React.useEffect(() => {
    window.localStorage.setItem('likes', likes)
  }, [likes])

  return (
    <>

      <Typography variant="h1" gutterBottom>
        Sobre o autor
      </Typography>

      <Card sx={{ maxWidth: 345 }}>

        <CardMedia
          sx={{ height: 345 }}
          image={foto}
          title="picture"
        />
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
            Marcelo José Martins Pereira
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Estudante desde sempre, programador a 2 anos e apaixonado por tecnologia. Gosta de jogar e assistir séries.
          </Typography>
        </CardContent>

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
