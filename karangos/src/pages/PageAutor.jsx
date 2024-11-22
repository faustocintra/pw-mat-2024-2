
import { Typography } from "@mui/material"
import { Card } from "@mui/material"
import { useState } from "react"
import './Autor.css'
import autorImagem from "../assets/cachorro_autor.jpg"

const PageAutor = () => {
    

    const [clickLike, setClickLike] = useState(() => {
        const likes = localStorage.getItem('likes')
        return likes ? Number(likes) : 0
    })

    const clickedLike = () => {
        setClickLike(clickLike + 1)
    }

  return (
    <div>
        <Typography className="title-autor">Sobre o autor</Typography>
        <br />
        <Card className="card-autor">
            <img className="foto-autor" src={autorImagem} alt="Foto perfil autor" />
            <div >
                <h1>Leonardo Garcia Andrade</h1>
                <p>Sou Leonardo Garcia, tenho 20 anos e estudo na faculdade de tecnologia Fatec em Franca. Sou desenvolvedor Web, estudando as tecnologias React, TypeScript e TailwindCss. Futuramente pretendo me tornar FullStack. Estou desenvolvendo esse projeto para mostrar um pouco das minhas habilidades como Front-End</p>
            </div>
            <button onClick={clickedLike}>CURTIR ({clickLike})</button>
        </Card>
    </div>
  )
}

export default PageAutor