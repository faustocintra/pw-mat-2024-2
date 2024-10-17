import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function BottomBar() {
    /* Estilos estendidos do MUI, estende styles */
    return (
        <Toolbar
            variant="dense"
            sx={{
                backgroundColor: 'action.disableBackground',
                justifyContent: 'center',
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
                Desenvolvido e mantido com café por: <a href="mailto:flp010@yahoo.com.br">Daniel Felipe </a>
            </Typography>
        </Toolbar>
    )
}