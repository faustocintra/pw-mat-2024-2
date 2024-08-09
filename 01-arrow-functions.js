/* função tradicional com 1 parâmetro e 1 linha de corp o*/

function quadrado(n){
    return n * n 
}
console.log('O quadrado de é ', quadrado(7))

/*
Função equivalente, usando a sintaxe de arrow funcition 
~> não necessita de chaves
~> não necessita de parênteses em torno do paramentro
~>não necessita da palavra chave return
~>a palavra chave é substituída pela flecha =>
=> LOGO APÓS o parâmetro
~> a arrow function é invocada pelo nome da constante que a recebe

*/ 

const quadradoA = n => n * nconsole.log('O quadrado de 7 é ',quadrado(7))

function calc(a,b,c){
    return a * b + c
}
console.log(' O resultado do cálculo é: ', calc(10, 20 ,30))
/*
Equivalente na sintaxe arrow function
~> QUando o número de parâmetros != 1, os parênteses voltam a ser obrigatórios
*/
const calcA = (a, b, c) => a * b * c 
console.log("[ARROW] O resultado do cálculo é: ", calcA(10,20,30))

/*
Função tradicional sem parâmetros, com uma linha de corpo e return
*/
function msgErro(){
    return 'Erro Fatal!!!'
}
console.log('[TRADI]: ', msgErro())
/*
Equivalente na sintaxe arrow function
~> parênteses vazios devem ser usados para marcar o lugar do parâmetro.
*/
const msgErroA = () => 'ERRO FATAL!!!'
console.log('[ARROW', msgErroA())

/*Função tradicional com um parâmetro e vários linhas de corpo*/
function fatorial(n){
    let resultado = 1
    for(let i = n; i > 1; i--) resultado *= i
    return resultado
}
console.log('[TRADI] O fatorial de 8 é ', fatorial(8))
/*
Equivalente no formato arrow function
~> não há economia de linhas no corpo da função
~> as chaves voltam a ser obrigatórias
*/
const fatorialA = n =>{
    let resultado = 1
    for( let i = n; i > 1; i--) resultado += i
    return resultado
}
console.log('[ARROW] O fatorial de 8 é: ', fatorialA(8))