import * as React from 'react'


function Greeting({initialName = ''}) {
  
  // 🐨 inicialize o estado como o valor do localStorage
    const [name, setName] = React.useState(
  // 💰 window.localStorage.getItem('name') ?? initialName
      window.localStorage.getItem('name') ?? initialName
      )
      //Contador iniciando em 0
      const[count, setCount] = React.useState(0)

  // A função deve armazenar `name` no localStorage
  // 🐨 Aqui é onde usamos `React.useEffect`.
      React.useEffect(() => {
  // 💰 window.localStorage.setItem('name', name)
        window.localStorage.getItem('name', name)
        console.count('Atualizou')
      }, [name])
      //[name] é o vetor de dependencias
      // Este useEffect() será executado somente quando a variavel nome mudar  

  

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Olá {name}</strong> : 'Por favor, informe seu nome'}
        <br />
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  )
}

function Exercicio02() {
  return <Greeting />
}

export default Exercicio02