import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 inicialize o estado como o valor do localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [name, setName] = React.useState(
    
    //Lazy initializer é uma tecnica com a qual garantimos que o valor 
    //inicial de uma variavel de estado seja carregado apenas uma vez, na fase de carregamento
    //(mount) do componente correspondente

    //para habilitar o lazy initializer, basta fazer com que o valor inicial
    //do estado seja retornado por uma função
    //()=> readLocalStorage()
    () => window.localStorage.getItem('name')?? initialName
)

  // function readLocalStorage(){
  //   console.count('Leu local storage')
  //   return window.localStorage.getItem('name')?? initialName
  // }
const [count, setCount] = React.useState(0)
  // 🐨 Aqui é onde usamos `React.useEffect`.
  // A função deve armazenar `name` no localStorage.
  // 💰 window.localStorage.setItem('name', name)

  React.useEffect(()=>{
    window.localStorage.setItem('name', name)
    console.count('Atualizou')
  }, [name])
  //[name] é vetor de dependencias
  //este useEffect() somente será executado quando o valor da variavel nome mudar

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
      <button onClick={() => setCount(count+1)}>Count: {count} </button>
    </div>
  )
}

function Exercicio02() {
  return <Greeting initialName="felisberto" />
}

export default Exercicio02