import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import './App.css'
import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import TopBar from './ui/TopBar'
import BottomBar from './ui/BottomBar'

import theme from './ui/theme'
import { ThemeProvider } from '@mui/material/styles'


function App() {

  console.log(theme.palette.primary.main)

  return (
    <>
      <ThemeProvider theme={theme}>

      <CssBaseline /> { /* Reseta o CSS */ }
      <BrowserRouter>
        <TopBar/>
        <BottomBar/>
      </BrowserRouter>

      </ThemeProvider>
    </>
  )
}

export default App
