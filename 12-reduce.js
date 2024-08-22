const nros = [5,10,15,20]
const nomes = ['Ana', 'Rafa', 'Kelly', 'Guilherme']

/* reduce() é um método que REDUZ um vetor a um único valor. Para isso, 
aplica uma função a cada elemento do vetor a qual efetua uma transformação
e acumula o resultado em cada passada*/

//reduce() para somar todos os elementos do vetor nros
const soma = nros.reduce((acumulador, elemento)=> acumulador+elemento)
console.log('Soma dos valores d vetor:', soma)

//reduce() para colocar em maiúsculas e concatenar com ;
//intercalados os elementos do vetor nomes
const resultado = nomes.reduce((a,e)=> a.toUpperCase() + ';'+ e.toUpperCase())
console.log('Nomes em maiúscula, delimitados por ponto-e-vírgulas: ', resultado)