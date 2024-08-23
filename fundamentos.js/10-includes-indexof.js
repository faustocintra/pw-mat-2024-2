const carros = ['Chevette', 'Fusca', 'Opala', 'Maverick', 'Belina', 'Del Rey']
 

/*
O metodo includes() testa se um dado elemento existe em um vetor
Retorna true se existir, ou false, caso contrário
*/

console.log('Tem Fusca?', carros.includes('Fusca'))
console.log('Tem Corcel?', carros.includes('Corcel'))
console.log('Tem Belina?', carros.includes('Belina'))

/*
antes só existia o indexOF()
O método indexOf() retorna o índice (posição) de um elemento no vetor.
Caso o elemento nao exista, retorna -1.
Lembre-se: o índice começa em 0
*/

console.log('Posição de Fusca: ', carros.indexOf('Fusca'))
console.log('Posição do Corcel: ', carros.indexOf('Corcel'))
console.log('Posição do Chevette: ', carros.indexOf('Chevette'))