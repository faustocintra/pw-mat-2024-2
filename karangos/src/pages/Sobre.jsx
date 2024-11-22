import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Sobre() {

    const [likes, setLikes] = React.useState(() => Number(localStorage.getItem("likes")) || 0)
    const [image, setImage] = React.useState('')


    React.useEffect(() => {
        localStorage.setItem("likes", likes)
    }, [likes])

    React.useEffect(() => {

        const fetchImage = async () => {
            const imageUrl = '/src/assets/foto.jpeg'
            setImage(imageUrl)
        };

        fetchImage()
    }, [])


    function HandleAddLikes() {
        setLikes(likes + 1);
    }

    return (
        <>
            <Typography variant="h1" gutterBottom>
                Sobre a autora
            </Typography>

            <Card sx={{ maxWidth: 345 }}>
                {image &&
                    <CardMedia
                        sx={{ height: 250 }}
                        image={image}
                        title="my photo"
                    />
                }

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Ana Luzia
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tenho 33 anos de idade, estou terminando o Curso de ADS, Trabalho em um E-commerce e pretendo continuar no mesmo, quero aplicar tudo que aprendi na faculdade para ajudar no crescimento da empresa.
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button
                        onClick={HandleAddLikes}
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '8px 16px',
                            '&:hover': {
                                backgroundColor: 'darkred'
                            }
                        }}
                    >
                        <FavoriteIcon sx={{ paddingRight: '8px' }} />
                        Curtir ({likes})
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}