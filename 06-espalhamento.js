// Encontrando o maior e o menor número em uma série
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

console.log({minimo, maximo})

// E se estes números estiverem em um vetor?
const nums = [2, -7, 8, 4, 0]

minimo = Math.min(nums)   // NÃO FUNCIONA
maximo = Math.max(nums)   // NÃO FUNCIONA

console.log({minimo, maximo})