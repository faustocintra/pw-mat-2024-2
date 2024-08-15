// Encontrando o maior e o menor valor em uma série
let minimo = Math.min(1, 2, 3, 4, 5);
let maximo = Math.max(1, 2, 3, 4, 5);

console.log(minimo, maximo);

// E se estes valores estiverem em um array?
const nums = [1, 2, 3, 4, 5];

minimo = Math.min(nums); // Não funciona
maximo = Math.max(nums); // Não funciona
minimoCorrigido = Math.min(... nums);  // O operador de espalhamento (...) é usado para "espalhar" os valores do array
maximoCorrigido = Math.max(... nums);  // O operador de espalhamento (...) é usado para "espalhar" os valores do array

console.log(minimo, maximo);
console.log(minimoCorrigido, maximoCorrigido);