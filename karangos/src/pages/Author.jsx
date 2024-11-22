import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import imagem from "../assets/tudo-sobre-papagaio-interna2.jpg";

export default function Author() {
  const [likes, setLikes] = useState(() => {
    const storedLikes = window.localStorage.getItem("likes");
    return storedLikes ? parseInt(storedLikes, 10) : 0;
  });

  useEffect(() => {
    window.localStorage.setItem("likes", likes);
  }, [likes]);

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Sobre o autor
      </Typography>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 350 }} image={imagem} title="papagaio" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Murilo Sousa Sanches
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Sou aluno do curso de ADS, tenho 23 anos e minha maior paixão é a
            arte, especificamente o campo da musica, em meu tempo livre eu tento
            compor e tocar meus instrumentos.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FavoriteIcon />}
            onClick={handleLike}
          >
            CURTIR ({likes})
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
