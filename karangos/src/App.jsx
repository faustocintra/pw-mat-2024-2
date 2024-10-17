import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


//import './App.css'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './ui/TopBar'
import theme from './ui/Theme'
import { ThemeProvider } from '@mui/material/styles';
import BottomBar from './ui/BottonBar';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>

        <CssBaseline /> {/* Reseta o CSS */}
        <BrowserRouter>
          <TopBar />
          <BottomBar />
        </BrowserRouter>

      </ThemeProvider>

    </>
  )
}

export default App
