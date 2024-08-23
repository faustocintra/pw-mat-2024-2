const numeros = [1, 2, -3, 4, 5, -6, 7, 8, 9, 10];
const frutas = ['banana', 'maçã', 'laranja', 'melancia', 'abacaxi', 'uva'];

// Encontrando o primeiro número negativo no vetor de números
console.log("Primeiro número negativo:", numeros.find(n => n < 0));

//Encontrando o primeiro número multiplo de 5 no vetor de números
console.log("Primeiro número multiplo de 5: ", numeros.find(n => n % 5 === 0));

// Encontando o primeiro número maior que 20 no vetor de números
console.log("Primeiro número maior que 20: ", numeros.find(n => n > 20));

// Encontrando a primeira fruta que começa com a letra 'm' no vetor de frutas
console.log("Primeira fruta que começa com a letra 'm': ", frutas.find(f => f.charAt(0) === 'm'));

// Encontrando a primeira fruta que começa com a letra 'r' no vetor de frutas
console.log("Primeira fruta que começa com a letra 'r': ", frutas.find(f => f.slice(-1) === 'r'));