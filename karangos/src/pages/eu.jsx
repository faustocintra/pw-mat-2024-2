import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function Autor() {

    const [likes, setLikes] = useState(() => {
        const contadorLikes = localStorage.getItem('likes');
        return contadorLikes ? JSON.parse(contadorLikes) : 0;
    });

    const contagemLike= () => {
        setLikes(likes + 1);
    };

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Apresentação
            </Typography>
            <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                    sx={{ height: 250}}
                    image="img/profile-pic.png" 
                    title="Yo"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Rafael Ricardo Silva
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Meu nome é Rafael, tenho 20 anos, estudo na FATEC, estou no 4 semestre de analise e desenvolvimento de sistemas<br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="large" 
                        color="primary" 
                        startIcon={<ThumbUpOffAltIcon />}
                        onClick={contagemLike}
                    >Curtir ({likes})
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}