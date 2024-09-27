
import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import Exercicio01 from './exercicios/01'
import Exercicio02 from './exercicios/02'

function App(){
  return (
    <>
      <h1>React Hooks</h1>
      <BrowserRouter>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/01">Exercicio 01</Link></li>
          <li><Link to="/02">Exercicio 02</Link></li>
        </ul>
      <hr />
      <Routes>

        <Route path="/" element={<div>Clique em um dos <em>Links</em> acima para exibir um exercicio</div>}/>
        <Route path="/01" element={<Exercicio01 /> } />
        <Route path="/02" element={<Exercicio02 /> } />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
