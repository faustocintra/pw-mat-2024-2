/*função Tradicional com 1 parâmetro  e 1 uma linha de corpo
*/
function quadrado(n){
    return n * n 

}

console.log('O quadrado de é ', quadrado(7))

/*
Função equivalente usando a sintaxe de arrow function
-> Não necessita de chaves
-> Não necessita de parênteses em torno do paramâmetro
-> Não necessita de palavra-chave return
-> A palavra chave function é substtuida pela flecha
    =>LOGO APÓS O PARÂMETRO
-> a arrow function é invocada pelo nome da constatnte que a recebe
*/

const quadradoA = n => n * n 

console.log('O quadrado de 7 é ', quadradoA(7))

/*
Função tradicional com mais de um parâmetro e apenas uma linha de corpo com o return
*/

function calc (a, b, c) {
    return a + b + c
}

cosole.log('[TRADI] O resultado do cálculo é', calc(10, 20, 30))

/*
Equivalente na sintaxe arrow function 
-> Quando o número de parâmetros !=1, os parâmetros voltam a ser obrigatórios
*/

const calcA= (a, b, c) => a * b + c

console.log('[ARROW] O resultado do cálculo é', calcA(10, 20, 30))

/*Função Tradicional sem parâmetros, com uma linha de corpo e return
*/

function msgErro(){
    return 'ERRO FATAL'
}

console.log('[TRADI]', msgErro())

/*
Equivalente na síntese arrow function
-> parenteses vazios devem ser usados para marcar o lugar do parâmetro
*/

const msgErroA = () => 'ERRO FATAL!!!'

console.log('[ARROW]', msgErroA())

/*Função tradicional com um parâmetro e várias linhas de corpo*/

function fatorial(n){
    let resultado = 1
    for(let i = n; i > 1; i--) resultado *= i
    return resultado
} 
console.log ('[TRADI] O fatorial de 8 é', fatorial(8))

/*Equivalente no formato arrow function 
-> Não há economia de linhas no corpo da função
-> As chaves voltam a ser obrigatórias
*/

const fatorialA = n => {
    let resultado = 1 
    for(let i = n; i > 1; i) resultado *= i
    return resultado
}
console.log('[ARROW] O fatorial de 8 é', fatorialA(8))

