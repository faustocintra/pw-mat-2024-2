import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function BottomBar() {
    return (
/*Estilos estendidos do MUI, estende styles */
        <Toolbar
        variant="dense"
        sx ={{
            backgroundColor: 'action.disabledBackground',
            justifyContent:'center',
            position: 'fixed',
            bottom: 0,
            width: '100vw'
        
        }}
        
        >
            <Typography 
            variant="caption" 
            gutterBottom 
            sx={{
                 display: 'block',
                 '& a': {
                    color: 'secondary.light' 
                }

                }}
            
            >
                Desenvolvido e mantido com café por <a href="mailto:ojevne.voigt@fatec.sp.gov.br">Aluno: Ojevne Eissimell Voigt</a>
            </Typography>
          
        </Toolbar>


    )
}