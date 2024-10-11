import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


//import './App.css'
import {BrowserRouter } from 'react-router-dom'

import TopBar from './ui/TopBar';
import { CssBaseline } from '@mui/material';
function App() {

  return (
    <>
    <CssBaseline/> {/*Reseta o CSS */}
     <BrowserRouter>
     <TopBar/>
     </BrowserRouter>
    </>
  )
}

export default App
