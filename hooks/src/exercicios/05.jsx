import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 crie uma ref aqui usando React.useRef()


  const tiltRef = React.useRef()


  React.useEffect(()=> {
    //const tiltNode = document.getElementById('tilt')
    const tiltNode = tiltRef.current
    VanillaTilt.init (tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5
    })
    //Quando o useEffect() retorna uma função, esta será executada
    //uma vez na fase unmount do ciclo de vida do componente
    return () => {
      console.log('Componente descarregado !')
      tiltNode.vanillaTilt.destroy()
    }

  }, [])
  /*o vetor de dependencias '[variavel]' pode estar com variável e então ele irá ser atualizado toda vez que este único for atualizado.
  o vetor pode estar declarado '[]' mas não ter variável ele irá ser executado uma vez
  o vetor pode nao ter nada, então será executado sempre quando qualquer um dos usestates forem atualizados.
  */

  // 🐨 adicione uma função `React.useEffect` aqui e use VanillaTilt para
  // fazer sua div parecer fantástica.
  // 💰 assim:
  // const tiltNode = tiltRef.current
  // VanillaTilt.init(tiltNode, {
  //   max: 25,
  //   speed: 400,
  //   glare: true,
  //   'max-glare': 0.5,
  // })
  
  // 💰 Não se esqueça de retornar uma função de limpeza. VanillaTilt.init 
  // vai adicionar um objeto ao seu DOM, precisando ser eliminado:
  // `return () => tiltNode.vanillaTilt.destroy()`
  
  // 💰 Não se esqueça de especificar seu vetor de dependências! No nosso
  // caso, samemos que o nodo do tilt nunca muda, então ajuste o vetor para `[]`.

  // 🐨 adicione a prop `ref` à div `tilt-root` aqui:
  return (
    <div className="tilt-root" /*id="tilt"*/ ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function Exercicio05() {
  return (
    <>
      <Tilt>
        <div className="totally-centered">vanilla-tilt.js</div>
      </Tilt>
      <hr />
      <Tilt>
        <div className="totally-centered">vanilla-tilt.js</div>
      </Tilt>
    </>
  )
}

export default Exercicio05