//vetores para teste 
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
const nomes = ['Rafaela', 'Ana', 'Joao', 'Higor', 'Gui']

/*
reduce() é um metodo que REDUZ um vetor a um unico valor. para isso, aplica 
uma funçao a cada elemento do vetor, a qual efetua uma transformação e acumula 
o resultado em cada passada
*/

//reduce() para somar todos os elementos do vetor nums 
const soma = nums.reduce((acumulador, elemento) => acumulador + elemento)
console.log('Soma dos numeros do vetor: ', soma)

//reduce() para colocar em maiusculas e concatenar com ponto-e-virgulas
//intercalando os elementos do vetor nomes 
const resultado = nomes.reduce(

    (a, b) => a.toUpperCase() + '; ' + b.toUpperCase()
)
console.log('Nomes em maiuscula, delimetados por ponto-e-virgulas: ', resultado)