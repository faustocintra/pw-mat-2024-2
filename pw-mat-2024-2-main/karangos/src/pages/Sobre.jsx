import React from "react";
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import foto from "../assets/1697737415012.png";


export default function Sobre(){
    const [likes, setLikes] = React.useState(
        () => localStorage.getItem('likes') ?? 0
    )

    React.useEffect(() => {
        localStorage.setItem('likes', likes)
      }, [likes])

    return (
        <>
            <Typography variant="h1">
                Sobre o autor
            </Typography>

            <Card sx={{maxWidth: 345}}>
                <CardMedia
                sx={{ height: 345}} 
                image={foto}
                title="selfie"
                ></CardMedia>
                <CardContent>
                    <Typography variant="h5">
                        Caio Eduardo Monteiro de Souza
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Engenheiro de Dados e estudante de análise e desenvolvimento de sistemas na Fatec Franca
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
    )
}