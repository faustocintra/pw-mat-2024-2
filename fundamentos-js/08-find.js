/* O metodo find() encontra, em um vetor, o primeiro elemento 
que corresponda ao retorno de uma função passada como parametro*/

const nros = [12,19,3,-4,13,-11,15,-1,0]
const frutas = ['laranja', 'banana', 'abacaxi', 'uva', 'maracujá', 'pera']

//encontrando o primeiro nro negativo no vetor dos nros
console.log('Primeiro número negativo:', nros.find(n => n<0))

//encontrando o primeiro nro multiplo de 5 
console.log('Primeiro número múltiplo de 5: ', nros.find(x=> x%5 === 0))

//encontrando o primeiro nro maior que 20
console.log('Primeiro número maior que 20: ', nros.find(i=> i>20))

//encontrando a primeira fruta que começa com a letra 'm'
console.log('Primeira fruta que começa com a letra "m": ', 
    frutas.find(f => f.charAt(0)==='m')
)

//encontrando a primeira fruta que termina com a letra 'r'
console.log('Primeira fruta que termina com a letra "r": ', 
    frutas.find(f => f.slice(-1)==='r')
)

