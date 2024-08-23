/*
O metodo filter() cria um NOVO VETOR contendo apenas os elementos do vetor de origem 
que atendem o criterio representado pela função passada como parametro 
*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maça', 'uva', 'jabuticaba', 'maracuja']

//numeros negativos 
const negativos = numeros.filter(n => n < 0)
console.log('Numeros negativos: ', negativos)

//numeros pares 
const pares = numeros.filter(x => x % 2 === 0)
console.log('Numeros pares: ', pares)

//numeros maiores que 20 
const maiores20 = numeros.filter(i => i > 20)
console.log('Numeros maiores que 20: ', maiores20)

//frutas que começa com a letra "m"
const mInicial = frutas.filter(f => f.charAt(0) === 'm')
console.log('Frutas começa com a letra "m": ', mInicial)

//frutas que terminam com a letra "i"
const iFinal = frutas.filter(a => a.slice(-1) === 'i')
console.log('Frutas que terminam com a letra "i": ', iFinal)

//frutas que terminam com a letra "r"
const rFinal = frutas.filter(y => y.slice(-1) === 'r')
console.log('Frutas que terminam com a letra "r": ', rFinal)