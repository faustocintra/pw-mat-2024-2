// Encontrando o maior e o menor número em uma série
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

console.log({minimo, maximo})

// E se estes números estiverem em um vetor?
const nums = [2, -7, 8, 4, 0]

minimo = Math.min(nums)   // NÃO FUNCIONA
maximo = Math.max(nums)   // NÃO FUNCIONA

console.log({minimo, maximo})



// "Copiando" carro1 para carro2
// const carro2 = carro1 // NÃO FUNCIONA

const carro1 = {
  modelo: 'Corolla',
  marca: 'Toyota',
  cor: 'Preto',
  ano: 2022
}

// Forçando a cópia de um objeto usando a sintaxe de espalhamento 
const carro2 = {...carro1} // FUNCIONA

// Mudando o valor das propriedades de carro2
carro2.modelo = 'Civic'
carro2.marca = 'Honda'
carro2.cor = 'Prata'
carro2.ano = 2023

console.log({carro1, carro2})


const frutas = ['banana', 'maçã', 'laranja']
const legumes = ['cenoura', 'batata', 'abóbora']

// Usando espalhamento para unir vetores
const alimentos = [...frutas, ...legumes]

console.log(alimentos)

// Desustruturação é a operação pela qual é possível extrair vaores de vetores e objetos, atribuindo-os a variáveis avulsas


// Desestruturação de vetores
const carros = ['Corolla', 'Civic', 'Gol', 'Palio']

// Desestruturação
const [carro01, carro02, carro03, carro04] = carros

// Fazendo o mesmo sem desustruturação
// const carro01 = carros[0]
// const carro02 = carros[1]
// const carro03 = carros[2]
// const carro04 = carros[3]

