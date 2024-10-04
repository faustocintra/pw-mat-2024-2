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
import Exercicio05 from './exercicios/05'
import Exercicio06 from './exercicios/06'


function App() {

  return (
    <>
      <h1>React Hooks</h1>

      <BrowserRouter>
      <ul>
      <li><Link to='/'>Início</Link></li>
        <li><Link to='/01'>Exercicio 01</Link></li>
        <li><Link to='/02'>Exercicio 02</Link></li>
        <li><Link to='/03'>Exercicio 03</Link></li>
        <li><Link to='/04'>Exercicio 04</Link></li>
        <li><Link to='/05'>Exercicio 05</Link></li>
        <li><Link to='/06'>Exercicio 06</Link></li>
      </ul>
      <hr />
      {/*Routes é o pai de Route*/}
      <Routes>
        <Route path="/" element={
          <div> Clique em um dos <em>links</em> acima para exibir um exercício</div>
        } />
        <Route path="/01" element={<Exercicio01 />} />
        <Route path="/02" element={<Exercicio02 />} />
        <Route path="/03" element={<Exercicio03 />} />
        <Route path="/04" element={<Exercicio04 />} />
        <Route path="/05" element={<Exercicio05 />} />
        <Route path="/06" element={<Exercicio06 />} />

      </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
