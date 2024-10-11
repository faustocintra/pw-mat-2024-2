import '@fontsource/roboto/300.css'; 
import '@fontsource/roboto/400.css'; 
import '@fontsource/roboto/500.css'; 
import '@fontsource/roboto/700.css';

//import './App.css'
import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import TopBar from './ui/TopBar'


function App() {
  
  return (
    <>
     <CssBaseline />
     <BrowserRouter>
        <TopBar />
     </BrowserRouter>
    </>
  )
}

export default App
