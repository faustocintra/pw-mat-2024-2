import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Exercicio01 from './exercicios/01'
import Exercicio02 from './exercicios/02'
import Exercicio03 from './exercicios/03'
import Exercicio04 from './exercicios/04'


function App() {
  return (
    <>
      <h1>React Hooks</h1>
      <BrowserRouter>
      <ul>
      <li><Link to="/">Inicio</Link></li>
        <li><Link to="/01">Exercicio 01</Link></li>
        <li><Link to="/02">Exercicio 02</Link></li>
        <li><Link to="/03">Exercicio 03</Link></li>
        <li><Link to="/04">Exercicio 04</Link></li>

      </ul>
      <hr />
      <Routes>
        <Route path="/" element={
          <div>Clique em um dos <em>links</em> acima para exibir um</div>
        }/>
        <Route path="/01" element={ <Exercicio01 />}/>
        <Route path="/02" element={ <Exercicio02 />}/>
        <Route path="/03" element={ <Exercicio03/>}/>
        <Route path="/04" element={ <Exercicio04/>}/>



      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
