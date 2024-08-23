//vetores para teste 
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
const nomes = ['Rafaela', 'Ana', 'Joao', 'Higor', 'Gui']
/*
o metodo map() cria um NOVO VEOTOR, de tamanho IDENTICO ao do vetor original 
em que cada elemento corresponde a uma transformação feita, no vetor de origem,
pela função passada como parametros 
*/

//map() que cria um novo vetor numero em que cada elemento corresponde 
// ao quadrado do elemento do vetor original 

const quadrados = nums.map(n => n ** 2)

console.log('Vetor original: ', nums)
console.log('vetor com quadrados: ', quadrados)

//map() que transforma os elementos do vetor original em itens da lista 
//para o uso em uma pagina HTML (aplicação fequente em react)
const itensLista = nomes.map(nome => `<li>${nome}<li>`)

console.log('<h1>OS NOMES MAIS BONITOS DO BRASIL</h1>')
console.log('<ul>')
for (let i of itensLista) console.log(i)
console.log('</ul>')