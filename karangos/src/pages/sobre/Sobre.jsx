import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function Sobre({ likes = 0 }) {
    const [state, setState] = React.useState(() => {
        const quantiadeLikes = window.localStorage.getItem('likes')
        return quantiadeLikes != null ? parseInt(quantiadeLikes) || 0 : likes;
    })
    React.useEffect(() => {
        window.localStorage.setItem('likes', state);
    }, [state]);
    function handleSubmit() {
        setState((prevState) => prevState + 1)
    }

    return (
        <div>
            <Typography gutterBottom variant="h1" fontSize={30}>
                Sobre o Autor 
            </Typography>
            <Card sx={{ maxWidth: 280, marginTop: 4}}>
                <CardMedia
                    sx={{ height: 280, width: 280 }}
                    image="/public/fotoPerfil.png"
                    title="Iago Matheus"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Iago Matheus
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Estudante da Fatec Franca, cursando o 4º Semestre do curso de Analise e Desenvolvimento de Sistemas.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSubmit} 
                        style={{color:'darkred', background: 'lightcoral'}}>
                        <FavoriteIcon/>Curtir ({state})
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
