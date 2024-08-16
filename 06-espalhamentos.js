//encontrando o maior e o menor numero em uma serie 
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

console.log({ minimo, maximo })

//E se esses numeros estiverem em um vetor?

const nums = [2, -7, 8, 4, 0]

minimo = Math.min(nums) //NÃO FUNCIONA
maximo = Math.max(nums) //NÃO FUNCIONA

console.log({ minimo, maximo })

/**
 A sintaxe de espalhamento ou spreading (representada por ...
 antes do nome da variavel) é capaz de "desempacotar" um vetor 
 em uma serie de valores avulsos
 */

minimo = Math.min(...nums)
maximo = Math.max(...nums)

console.log({ minimo, maximo })

/**********************************************************/

const carro1 = {
    modelo: 'Fiorino',
    marca: 'Fiat',
    ano: 2015,
    cor: 'Prata'
}

// "Copiando" carro1 para carro2
//const carro2 = carro1   --> NÃO FUNCIONA

//forçando a cópia de uma objeto usando a sintaxe de espalhamento 
const carro2 = { ...carro1 }

//Mudando o valor das propriedades de carro2

carro2.modelo = 'Fusca'
carro2.marca = 'Volkswagen'
carro2.cor = 'Preto'
carro2.ano = 2000

//Exibindo ambos os carros 
console.log({ carro1, carro2 })


/****************************************/

//PROBLEMA : JUNTAR DOIS OU MAIS VETORES EM UM TERCEIRO VETOR 

const frutas = ['maça', 'banana', 'laranja']
const verduras = ['alface', 'couve', 'rúcula']

//juntando os dois vetores usando JS "classico" (anterior a 2015)
//const hortifruti = frutas.concat(verduras)

//usando espalhamento para unir vetores
const hortifruti = [...frutas, ...verduras]

console.log(hortifruti)


/*********************************************/

//PROBLEMA: escrever uma função que recebe um numero arbitrario de parametros

function soma(...nums) {
    //nums é recebido na função como um vetor 
    console.log('Parametros recebidos:', nums)
    let resultado = 0
    for (let n of nums) resultado += n
    return resultado

}
console.log('Soma de 7 números:', soma(1, 2, 3, 4, 5, 6, 7))
console.log('Soma de 12 números:', soma(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12))






