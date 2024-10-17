import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

export default function BottomBar(){
    /* sx = Estilos estendidos do MUI, estende styles */
    return(
        <Toolbar 
            variant="dense"
            sx={{
                backgroundColor: 'action.disabledBackground',
                justifyContent: ' center',
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
                Desenvolvido e mantido com café por <a 
                    href="mailto:leonardomazza94@hotmail.com">Leonardo Henrique Mazza</a>
            </Typography>
        </Toolbar>
    )
}