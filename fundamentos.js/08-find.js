/* O método find() encontra, em um vetor, o PRIMEIRO ELEMENTO que corresponda ao retorno de uma função passada como parâmetro*/

const numeros = [12, 19, 3, -4, 13, -11, 15, -1, 0]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá' ]

//eNCONTRANDO O PRIMEIRO NÚMERO NEGATIVO NO VETOR DE NÚMEROS
console.log('Primeiro número negativo: ', numeros.find (n=> n < 0))

//Encontrando o primeiro número múltiplo de 5
console.log('Primeiro múltiplo de 5: ', numeros.find(x => x % 5 === 0))

//Encontrando o primeiro número maior que 20
console.log('Primeiro número maior que 20: ', numeros.find(i => i >20))

//Encontrando a primeira fruta que começa com a letra "m"
//charAt retira de letra em letra
console.log('Primeira fruta que começa com "m": ',
frutas.find(f => f.charAt(0) === 'm')
// ou frutas.find(f => f.charAt(f.lenght-1))
)
// ou f => f.charAt(f.lenght-1)

//Encontrando a primeira fruta que termina com a letra "r"
//slice fatia de tráz para frente, retirando blocos de letras inteiras se necessário
console.log('Primeira fruta que termina com "r" ',
frutas.find(f=> f.slice(-1)==='r')
)

