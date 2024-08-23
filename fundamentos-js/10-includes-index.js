const carros = ['chevette', 'fusca', 'opala', 'maverick', 'belina', 'del rey']

/*
O metodo includes() testa se um dado elemento existe em um vetor 
retorna true se existe, ou false, caso contrario 
*/
console.log('Tem fusca? ', carros.includes('fusca'))
console.log('Tem corcel? ', carros.includes('corcel'))
console.log('Tem belina? ', carros.includes('belina'))

/*
O metodo indexOf() retorna o indece (posição) de um elemento no vetor 
caso o elemento não exista, retorna -1
*/

console.log('Posição de fusca: ', carros.indexOf('fusca'))
console.log('Posição de corcel: ', carros.indexOf('corcel'))
console.log('Posição de chevette: ', carros.indexOf('chevette'))
