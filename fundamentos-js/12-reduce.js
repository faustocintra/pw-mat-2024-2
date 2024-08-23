// Vetores para teste
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
const nomes = ['Aurival', 'Joender', 'Neurivania', 'Terebintina', 'Leucimar']

/*
    reduce() é um método que REDUZ um vetor a um único valor. Para isso, aplica uma função a cada elemento do vetor,
    a qual efetua uma tranformação e acumula o resultado em cada passada
*/

// reduce() para somar todos os elementos do vetor nums
const soma = nums.reduce((acumulador, elemento) = acumulador + elemento);
console.log('Soma dos números do vetor: ', soma);

// reduce() para colocar em maiúsculas e concatenar com ponto-e-vírgulas
// intercalados os elementos do vetor nomes
const resultado = nomes.reduce((a,e) => a.toUpperCase() + ';' + e.toUpperCase()
);
console.log('Nomes em maiúscula, delimitados por ponto-e-vírgula: ', resultado);