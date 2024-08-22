/*Método find() encontra, em um vetor, o PRIMEIRO ELEMEMTO que corresponda 
ao retorno de uma função passada com parâmetro*/

const numeros = [12, 19, 3, -4, 13, -11, 15 -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá']

//Encontrando o primeiro número negativo no vetor de números
console.log('Primeiro número negativo:', numeros.find(n => n < 0))

//Encontrando o primeiro número multiplo de 5
console.log('Primeiro múltiplo de 5:', numeros.find(x => x % 5 === 0))

//Encontrando o primeiro número maior que 20
console.log('primeiro número maior que 20:', numeros.find(i => i > 20))

//Encontrando a primeira fruta que começa com a letra "m"
console.log('primeira fruta que começa com a letra "m":', frutas.find(f => f.charAt(0)==='m'))

//Encontra a primeira fruta que termina com a letra "r"
console.log('primeira fruta que termina com a letra "r":', frutas.find(f => f.slice(-1)==='r'))
