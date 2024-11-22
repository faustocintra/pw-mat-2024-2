/*
  const params = useParams()
  React.useEffect(() => {
    if (params.id) loadData()
    /*o array de dependências está vazio ([]), 
      o que significa que o efeito será executado apenas uma vez, 
      logo após a primeira renderização do componente.
      Ou seja: quando a página for carregado
  }, [])
  */


import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Contadora {
   
    const [name, setName] = React.useState(
        () => window.localStorage.getItem('name') ?? initialName

    
    )

    function readLocalStorage() {
        console.count('Leu local storage')
        return window.localStorage.getItem('name') ?? initialName
    }

    const [count, setCount] = React.useState(0)


    //DECORE ISTO
    //React.useEffect(() => {})

    React.useEffect(() => {
        window.localStorage.setItem('name', name)
        console.count('Atualizou')
    }, [name])
   

    function handleChange(event) {
        setName(event.target.value)
    }
    return (
        <>
            { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
            <Typography variant="h1" gutterBottom>
                Sobre o autor
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="./saga.jpg"
                    title="Saga de Gêmeos"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Ojevne Eissimell Voigt
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Ojevne Voigt é um homem esforçado que gosta da solitude e da paz interior.
                        Está no quarto período de Análise e Desenvolvimento de Sistemas.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left', //Alinhando à direita
                        mb: 2 //Margem inferior (margin-bottom)
                    }} >
                        <Link to=".new">
                            <Button variant="contained"
                                size="medium"
                                color="secondary"
                                startIcon={< FavoriteIcon />}
                                onClick = {() => setCount (count + 1)}>
                                
                                CURTIR {count}
                            </Button>
                        </Link>
                    </Box>
                </CardActions>
            </Card>





        </>
  }

function SobreAutor() {
    return <Greeting initialName="Felizberto" />
}

export default SobreAutor