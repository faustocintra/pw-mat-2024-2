/*O método includes() testa se um dado elemento existe 
em um vetor e retorna true se existir ou false se for o contrário*/
 const carros = ['Chevette', 'Fusca', 'Opala', 'Maverik', 'Belina', 'Del Rey']
 console.log('Tem Fusca?', carros.includes('Fusca'))
 console.log('Tem Corsel?', carros.includes('Corsel'))
 console.log('Tem Belina?', carros.includes('Belina'))

 /*O método indexOf() retorna o índice, posição, de um elemento no
 vetor. Caso o elemento não exista, retorna -1.*/
 console.log('Poisição Fusca: ', carros.indexOf('Fusca'))
 console.log('Poisição Corcel: ', carros.indexOf('Corcel'))
 console.log('Poisição Chevette: ', carros.indexOf('Chevette'))