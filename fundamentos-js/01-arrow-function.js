/*Função tradicional com 1 parametro e 1 linha de corpo */

function quadrado(n) {
    return n * n
}
console.log('[tradicional] O quadrado de 7 é', quadrado(7))

/* 
função equivalente, usando a sintaxe de arrow function
~> não necessita de chaves 
~> não necessita de parenteses em torno do parametro 
~> não necessita da palavra-chave return
~> a palavra-chave function é substituida pela flecha => LOGO APOS o parametro
~> arrow function é invocada pelo nome da constante que a recebe
 */

const quadradoA = n => n * n
console.log('[arrow] O quadrado de 7 é', quadradoA(7))


/* Função tradicional com mais de um parametro e apenas uma linha de corpo com return */

function calc(a, b, c) {
    return a * b + c
}
console.log('[tradicional] O resultado do calculo é', calc(10, 20, 30))

/*equivalente na sintaxe arrow function
~> quando o numero de parametros for diferente de 1, os parenteses voltam a ser obrigatorios 
*/

const calcA = (a, b, c) => a * b + c

console.log('[arrow] O resultado do calculo é', calcA(10, 20, 30))

/* função tradicional sem parametros, com uma linha de corpo e return */

function msgErro() {
    return 'ERRO FATAL!!'
}

console.log("[tradicional]", msgErro())

/*equivalente na sintaxe arrow function
~> parenteses vazios devem ser usados para marcar o lugar do parametro  
*/

const msgErroA = () => 'ERRO FATAL!!'

console.log("[arrow]", msgErroA())

/* função tradicional com um parametro e varias linhas de corpo */

function fatorial(n) {
    let resultado = 1
    for (let i = n; i > 1; i--) resultado *= i
    return resultado
}

console.log("[tradicional] O fatorial de 8 é ", fatorial(8))

/*equivalente na sintaxe arrow function
~> não há economia de linhas no corpo da funçaõ 
~> as chaves voltam a ser obrigatorias  
*/
const fatorialA = n => {
    let resultado = 1
    for (let i = n; i > 1; i--) resultado *= i
    return resultado
}
console.log("[arrow] O fatorial de 8 é ", fatorialA(8))




