import React, { useState } from "react";
import { Typography, Card, CardContent, CardActions, Button, CardMedia } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dalilaImage from '../assets/dalila.png'

const SobreOAutor = () => {
    // Estado inicial com lazy initializer
    const [likes, setLikes] = useState(() => {
        return parseInt(localStorage.getItem("likes")) || 0;
    });

    // Atualiza o LocalStorage quando o estado muda
    React.useEffect(() => {
        localStorage.setItem("likes", likes);
    }, [likes]);

    // Incrementa os likes ao clicar
    const handleLike = () => {
        setLikes((prevLikes) => prevLikes + 1);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
            <Card style={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="Foto do autor"
                    height="140"
                    image={dalilaImage}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Dalila Bueno Martins
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Apaixonada por programação e movida pela perseverança, acredito no poder do código para transformar ideias em realidade.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<ThumbUpIcon />}
                        onClick={handleLike}
                    >
                        Curtir ({likes})
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default SobreOAutor;
