// Vetores para teste
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const nomes = ['Ana', 'Bia', 'Carla', 'Duda', 'Eva', 'Fê', 'Gabi', 'Helo', 'Iara', 'Jana'];

/*
    O método map() cria um novo vetor com o resultado da função passada como argumento
    aplicada a cada elemento do vetor original.
*/

// map() que cria um novo vetor númerico em que cada elemento é o quadrado do elemento correspondente

const quadrados = nums.map(n => n ** 2);

console.log("Vetor original:", nums);
console.log("Vetor com os quadrados dos elementos:", quadrados);

// map() que transforma os elementos do vetor orignial em itens de lista
// para uso em uma página HTML (aplicação frequente em React)
const itensLista = nomes.map(nome => `<li>${nome}</li>`);

console.log('<h1>OS NOMES MAIS BONITOS DO BRASIL</h1>');
console.log('<ul>');
for(let i of itensLista) console.log(i)
console.log('</ul>');
