//Encontrando o maior e o menor número em uma série
let minimo = Math.min(2,-7,8,4,0)
let maximo = Math.max(2,-7,8,4,0)
console.log('Números Avulsos: ',{minimo, maximo})

//E see estes números estivrem em um vetor?
const nums = [2,-7,8,4,0]
minimo = Math.min(nums)// NÃO FUNCIONA

maximo = Math.max(nums)// NÃO FUNCIONA
console.log('Array:', {minimo, maximo})

/*
A sintxe de espalahamento ou spreading (representada por... 
    antes do nome da variável) é capaz de "desempacotar" um vetor em uma xsérie de valores avulsos
*/

minimo = Math.min(...nums)
maximo = Math.max(...nums)
console.log('Array tratado como individual ', {minimo,maximo})

/******************************************* */

const carro1 = {
    modelo: 'Fiorino',
    marca: 'Fiat',
    ano: '1984',
    cor: 'bege'
}

//"Copiando" carro1 para carro2
//const carro2 = carro1 // NÃO FUNCIONA
//console.log({carro1,carro2})

//fORÇANDO A CÓPIA DE UM OBJETO USANDO A SINTAXE DE ESPALHAMENTO
const carro2 = {... carro1}

//Mudando o valor das propriedades de carro2
carro2.modelo = 'Fusca'
carro2.marca = 'Volksvagen'
carro2.cor = 'preto'
carro2.ano = 1969

//Exibindo ambos os carros
console.log({carro1,carro2})

/*************************************************************** */
//PROBLEMA: juntar dois ou mais vetores em um terceiro vetor
const frutas = ['maça','banana','laranja']
const verduras = ['alfaces', 'couve', 'rúcula']
//JUNTANDO OS DOIS VETORES USANDO JS 'CLÁSSICO' ANTERIOR A 2015
//const hortifruti = frutas.concat(verduras)

//Usando espalhamento para unir vetores
const hortifruti = [...frutas, ...verduras]
console.log(hortifruti)

/*********************************************** */
//PROBLEMA: escrever uma função que receba um número arbitrário
// de parâmetros

function soma(... nums){
//nums é recebido dentro da função como um vetor
console.log('Parâmetros recebidos: ', nums)
let = resultado = 0
for (let n of nums) resultado += n 
return resultado

}
console.log('Soma 7 números: ', soma(1,2,3,4,5,6,7))
console.log('Soma 12 números: ', soma(1,2,3,4,5,6,7,8,9,10,11,12))