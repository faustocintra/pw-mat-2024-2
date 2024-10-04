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

function PokemonInfo({pokemonName}) {
  // 🐨 crie o estado para o pokémon (null)
  const [pokemon, setPokemon] = React.useState(null)

  // 🐨 crie React.useEffect de modo a ser chamado sempre que pokemonName mudar.
  // 💰 NÃO SE ESQUEÇA DO VETOR DE DEPENDÊNCIAS!

   // 🐨 crie uma ref aqui usando React.useRef()
   const tiltRef = React.useRef()

  React.useEffect(()=> {

    // 💰 se pokemonName é falso (ou uma string vazia) não se preocupe em fazer 
  // a requisição (retorne precocemente).
  if (!pokemonName) return

  // 🐨 antes de chamar `fetchPokemon`, limpe o estado atual do pokemon
  // ajustando-o para null.
  setPokemon(null)

  // (Isso é para habilitar o estado de carregamento ao alternar entre diferentes
  // pokémon.)
  // 💰 Use a função `fetchPokemon` para buscar um pokémon pelo seu nome:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => {/* atualize todos os estados aqui */},
  //   )

  //fetchPokemon() enviará pokemonName para o servidor remoto e aguardará
  //o retorno de pokemonData. Quando pokemon Data for retornado, atualiza
  //a variável de estado pokemon com as informações contidas em pokemonData
  fetchPokemon(pokemonName).then(
    pokemonData => setPokemon (pokemonData)
  )

  }, [pokemonName])


  // 🐨 retorne o seguinte baseado nos estados `pokemon` e `pokemonName`:
  //   1. não há pokemonName: 'Informe um pokémon'
  //   2. tem pokemonName mas não pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. tem pokemon: <PokemonDataView pokemon={pokemon} />

  // 💣 remova isso
if (!pokemonName) return 'Informe um pokemon' //1.
else if (pokemonName && !pokemon) 
  return <PokemonInfoFallback name={pokemonName} />//2
else if (pokemon) return <PokemonInfoFallback name={pokemonName} />
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