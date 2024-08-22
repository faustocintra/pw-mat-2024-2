//Vetores para teste
//const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]

//const nomes = ['Aurival', 'Joender', 'Neurivânia', 'Terebintina', 'Leucimar']

/*
reduce() é um método que REDUZ um vetor a um único valor. Para isso, aplica uma função a cada elemento do vetor, 
ao qual efetua uma transformação e acumula o resultado em cada passada
*/


 //reduce() SOMA TODOS OS ELEMENTOS DE UM VETOR.
 const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
 const soma = nums.reduce((acumulador, elemento) => acumulador + elemento)
 console.log('Soma dos números do vetor: ', soma)


 //reduce()TRANSFORMA UM VETOR EM STRING
//colocar em MAIÚSCULAS e CONCATENA com ponto-e-vírgulas
 //intercaladas os elementos do vetor nomes
 const nomes = ['Aurival', 'Joender', 'Neurivânia', 'Terebintina', 'Leucimar']
 const resultado = nomes. reduce(
(a, e) => a.toUpperCase() + '; ' + e.toUpperCase()
 )
 console.log('Nomes em Maiúscula, delimitados por ponto-e-vírgulas: ', resultado)