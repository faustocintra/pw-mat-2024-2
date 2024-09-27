import * as React from 'react'

function Greeting({initialName}) {
  //const [name, setName] = React.useState('')
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Nome: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Olá {name}</strong> : 'Por favor, informe seu nome'} 
    </div>
  )
}

function Exercicio01() {
  return Greeting({initialName: "Ana"})
}

export default Exercicio01