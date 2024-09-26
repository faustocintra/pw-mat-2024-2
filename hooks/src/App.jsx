import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Exercicio01 from './exercicios/01'

function App() {

  return (
    <>
      <h1>React Hooks</h1>
      <BrowserRouter>
        
        <ul>
        <li> <Link to="/">Início</Link> </li>
          <li> <Link to="/01">Exercício 01</Link> </li>
        </ul>
        <hr />

        <Routes>
          <Route path="/" element={
            <div>Clique em um dos <em>Links</em> acima para exibir um exercício</div>
          } />

          <Route path="/01" element={ <Exercicio01 /> } />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
