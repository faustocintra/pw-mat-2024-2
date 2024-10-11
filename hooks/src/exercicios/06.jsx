import * as React from 'react'
// 🐨 você vai precisar dos seguintes itens de '../pokemon':
// fetchPokemon: a função que retorna as informações do pokémon
// PokemonInfoFallback: o que é exibido enquanto as informações do pokémon
// são carregadas
// PokemonDataView: o componente usado para exibir as informações do pokémon
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView
} from '../pokemon'


function PokemonInfo({ pokemonName }) {
  // 🐨 crie o estado para o pokémon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(false)
  // const [status, setStatus] = React.useState('ocioso')

  //  Convertendo três varíaveis de estado avulsal para uma única 
  //  variavel de estado em forma de objeto
  const [state, setState] = React.useState({
    pokemon: null,
    error: false,
    status: 'ocioso'
  })

  //  Para facilitar o código podemos criar variaveis somente-leitura
  //  a partir da variavel de estado de objeto usando desestruturação

  const { pokemon, error, status } = state

  // 🐨 crie React.useEffect de modo a ser chamado sempre que pokemonName mudar.
  // 💰 NÃO SE ESQUEÇA DO VETOR DE DEPENDÊNCIAS!
  React.useEffect(() => {
    console.count('Atualizou estado')
  })  // Sem vetor de dependências, será executado após 
  // qualquer atualização de estado
  React.useEffect(() => {
    //  Se pokemonName é falso (ou uma string vazia) não se preocupe em fazer
    //  a requisiçãp (retorne precocemente)
    if (!pokemonName) return

    // 🐨 antes de chamar `fetchPokemon`, limpe o estado atual do pokemon
    // ajustando-o para null.

    //  Para atualizar apenas o campo 'pokemon';
    // const stateCopy = {...state}
    // stateCopy.pokemon = 'novo valor'
    // setState(stateCopy)
    // //  Para facilitar, é possivel fazer todas as operações em uma única linha
    // setState({...state, pokemon: 'novo valor'})

    // setPokemon(null)
    // setError(false)
    // setStatus('ocioso')

    //  Atualizando os três status simultaneamente, gereando apenas 
    //  UM redesenho do componente
    setState({ pokemon: null, error: false, status: 'ocioso' })

    // (Isso é para habilitar o estado de carregamento ao alternar entre diferentes
    // pokémon.)
    // 💰 Use a função `fetchPokemon` para buscar um pokémon pelo seu nome:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* atualize todos os estados aqui */},
    //   )

    //  fetchPokemon() enviará pokemonName para o servidor remoto e aguardará
    //  o retorno de pokemonData. QUando pokemonData for retornado, atualizara
    //  a variável de estado pokemon com as informações contidas em pokemonData
    // setStatus('pendente')
    setState({ ...state, status: 'pendente' })
    fetchPokemon(pokemonName)
      //  then() é chamado quando a requisição da certo
      .then(
        pokemonData => {
          // setPokemon(pokemonData)
          // setStatus('resolvida')
          setState({ ...state, pokemon: pokemonData, status: 'resolvida' })
        }
      )
      //  catch() é chamado quando a requisição da erro
      .catch(
        //  Guardamos o erro em um estado para depois eexibir a 
        //  respectiva mensagem
        error => {
          // setError(error)
          // setStatus('rejeitada')
          setState({ ...state, error, status: 'rejeitada' })
        }
      )
  }, [pokemonName])

  // 🐨 retorne o seguinte baseado nos estados `pokemon` e `pokemonName`:
  //   1. não há pokemonName: 'Informe um pokémon'
  //   2. tem pokemonName mas não pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. tem pokemon: <PokemonDataView pokemon={pokemon} />

  // if (error) return <div role='alert'>
  //   Houve um erro: <pre style={{whiteSpace: 'normal'}}>
  //   </pre>
  // </div>
  // if (! pokemonName) return 'Informe um pokemon'  // 1.
  // else if(pokemonName && !pokemon) 
  //   return <PokemonInfoFallback name={pokemonName} /> // 2.
  // else if(pokemon) 
  //   return <PokemonDataView pokemon={pokemon} /> // 3.

  switch (status) {
    case 'ocioso':
      return 'Informe um pokémon'

    case 'pendente':
      return <PokemonInfoFallback name={pokemonName} />

    case 'resolvida':
      return <PokemonDataView pokemon={pokemon} />

    default:        // Case 'rejeitada'
      return <div role="alert">
        Houve um erro: <pre style={{ whiteSpace: 'normal' }}>
          {error.message}
        </pre>
      </div>
  }


  // 💣 remova isso
  //   return 'TODO'
  
}


  function Exercicio06() {
    const [pokemonName, setPokemonName] = React.useState('')

    function handleSubmit(newPokemonName) {
      setPokemonName(newPokemonName)
    }

    return (
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </div>
    )
  }

  export default Exercicio06