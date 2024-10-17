import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function BottomBar() {
  /* sx = estilos estendidos do MUI, estede styles */
  return (
    <Toolbar variant="dense" 
    
    sx={{   backgroundColor: 'action.disabledBackground',
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
        display: "block", 
        '& a': {
            color: 'secondary.light'
        }
      }}
      >
        Desenvolvido e mantido com Energético por <a href="mailto:rafael.ricardosilva2004@gmail.com">Rafael Silva</a>
      </Typography>
    </Toolbar>
  );
}
