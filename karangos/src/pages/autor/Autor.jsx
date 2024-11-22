import * as React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import fotoAutor from '../autor/autor.jpeg'

export default function Autor(){
    const[likes, setLikes] = React.useState(
        () => window.localStorage.getItem('likes') ?? 0
    )

    React.useEffect(() => { 
        window.localStorage.setItem('likes', likes) 
      }, [likes])

    return(
        <>
            <Typography gutterBottom variant='h1'>
                Sobre o autor
            </Typography>

            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={fotoAutor}
                    title="Leonardo Henrique Mazza"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Leonardo Henrique Mazza
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Me chamo Leonardo, tenho 19 anos e atualmente faço o curso de Análise e Desenvolvimento de Sistemas na Fatec de Franca SP, trabalho em casa com minha mãe na banca de pesponto de calçados.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        variant='contained'
                        color="secondary"
                        onClick={() => setLikes(Number(likes) + 1)}
                    >
                        <FavoriteIcon 
                            fontSize='small'
                            sx={{ mb: -0.5 }} 
                        />
                        CURTIR ({likes})
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}