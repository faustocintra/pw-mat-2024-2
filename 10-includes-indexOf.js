const carros = ['Chevette', 'Fusca', 'Opala', 'Marverck', 'Belina', 'Del Rey']

/*O métoo includes() teta se um dado elemento existe em um vetor
retorna true se existir, ou false, caso contrário*/

console.log('Tem Fusca?', carros.includes('Fusca'))
console.log('Tem Corcel?', carros.includes('Corcel'))
console.log('Tem Belina?', carros.includes('Belina'))

/* O método indexOf() retorna o índice (posição) de um elemneto no vetor
caso o elemento não exista retorna -1*/

console.log('Posição do Fusca?', carros.indexOf('Fusca'))
console.log('Posição do Corcel?', carros.indexOf('Corcel'))
console.log('Posição do Chevette?', carros.indexOf('Chevette'))