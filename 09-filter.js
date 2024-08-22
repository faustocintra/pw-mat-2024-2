/* 
O método filter() cria um NOVO VETOR contendo apenas os elementos do vetor
de origem que atendam ao critério representado pela função passada como parâmetro
*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá' ]


//acha TODOS Números negativos
const negativos = numeros.filter( n => n < 0)
console.log('Números negativos: ', negativos)

//Números pares
const pares = numeros.filter(x=> x % 2 === 0)
console.log('Números pares: ', pares)

//Números maiores que 20
const maiores20 = numeros.filter(i => i > 20)
console.log('Números maiores que 20: ', maiores20)

//Frutas que começam com a letra "m"
const mInicial = frutas.filter(f => f.charAt(0) === 'm' )
console.log('Frutas que começam com a letra "m": ', mInicial)

//Frutas que terminam com a letra "i"
const iFinal = frutas.filter (a => a.slice (-1) === 'i')
console.log('Frutas que terminam com a letra "i": ', iFinal)

//Frutas que terminam com a letra "r"
const rFinal = frutas.filter(y => y.slice (-1) === 'r')
console.log('Fruytas que terminam com a letra "r: ', rFinal)