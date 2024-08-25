// Vetores para teste
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
const nomes = ['Aurival', 'Joender', 'Neurivânia', 'Terebintina', 'Leucimar']

/*
  O método map() cria um NOVO VETOR, de tamanho IDÊNTICO ao do vetor
  original, em que cada elemento corresponde a uma transformação feita,
  no vetor de origem, pela função passada como parâmetro
*/

// map() que cria um novo vetor numérico em que cada elemento corresponde ao quadrado do elemento do vetor original
const quadrados = nums.map(num => num ** 2)

console.log('Vetor original:', nums)
console.log('Vetor com quadrados:', quadrados)

// map() que transforma os elementos do vetor original em itens de lista
// para uso em uma página HTML (aplicação frequente em React)

const  itensLista = nomes.map(nome => `<li>${nome}</li>`)

console.log('<h1>OS NOMES MAIS BONITOS DO BRASIL</h1>')
console.log('<ul>')
for(let i of itensLista) console.log(i)
console.log('</ul>')