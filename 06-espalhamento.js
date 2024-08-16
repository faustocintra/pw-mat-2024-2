// Encontrando o maior e o menor número em uma série
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

console.log({minimo, maximo})

// E se estes números estiverem em um vetor?
const nums = [2, -7, 8, 4, 0]

minimo = Math.min(nums)   // NÃO FUNCIONA
maximo = Math.max(nums)   // NÃO FUNCIONA

console.log({minimo, maximo})

/* A síntese de espalhamento ou spreading(representada por ... antes do nome da varável) é capaz de 
"desenpacotar" um vetor em uma série de valores avulsos */

minimo = Math.min(...nums)
maximo = Math.max(...nums)
console.log('Array tratado como individual', {minimo, maximo})

/********************************************************/

const carro1 = {
    modelo: 'Fiorino',
    marca: 'Fiat',
    ano: '1984',
    cor: 'bege'
}

//Copiando carro1 para Carro2
//const carro2 = carro1 // Não funciona
//console.log ({carro1, carro2})

//Forçando a cópia de um Obejeto usando a sintaxe de espalhamento
const carro2 = {...carro1}

//Mudando o valor da propriedade de carro2

carro2.modelo = 'Fusca'
carro2.marca = 'Volksvagem'
carro2.cor = 'Preto'
carro2.ano = '1969'

//Exibindo ambos os carros
console.log ({carro1, carro2})

//PROBLEMA: JUNTAR DOIS OU MAIS VETORES EM UM TERCEIRO VETOR
 
const frutas = [`maça`, `banana`, `laranja`]
const verduras = [`alface`, `couve`, `rucula`]
 
//Juntando os dois vetores usando JS "classico" (anterior a 2015)
// const hortifruti = frutas.concat(verduras)
 
// Usando espalhamento para unir vetores
const hortifruti = [...frutas, ...verduras]
 
console.log(hrtifruti)
 
/********************************************************************/
//PROBLEMA: escrever uma função que recebe um numero arbitrario de parametros
 
function soma(...nums) {
//nums é recebido dentro da funcao como vetor
let resultado = 0
for(let n of nums) resultado += n
return resultado
}
console.log('Soma 7 números:', soma(1,2,3,4,5,6,7))
console.log('Soma 12 números:', soma(1,2,3,4,5,6,7,8,9,10,11,12))
