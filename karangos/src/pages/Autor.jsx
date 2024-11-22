import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

export default function Autor() {

    const [likes, setLikes] = useState(() => {
        const savedLikes = localStorage.getItem('likes');
        return savedLikes ? JSON.parse(savedLikes) : 0;
    });

    const contaLikes= () => {
        setLikes(likes + 1);
    };

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                Quem sou eu
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 250}}
                    image="foto/IMG_20230710_130547.jpg" 
                    title="Yo"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Daniel Felipe de Sousa Rodrigues
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Estudante do 4 semestre na Faculdade de Tecnologia de Franca Dr. Thomaz Novelino<br />
                        Cursando curso Tecnológico Superior em Análise e Desenvolvimento de Sistemas.<br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="medium" 
                        color="secondary" 
                        startIcon={<FavoriteTwoToneIcon />}
                        onClick={contaLikes}
                    >Curtir ({likes})
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
