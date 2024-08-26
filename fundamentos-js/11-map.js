const nros = [2,3,5,7,11,13,17,19,23,29,31]
const nomes = ['Ana', 'Rafa', 'Kelly', 'Guilherme']

/*O método map() cria um novo vetor, de tamanho idêntico ao do vetor 
original em que cada elemento corresponde a uma transformação feita, 
no vetor de origem, pela função passada como parametro*/

/* map() que cria um novo vetor numérico em que cada elemento 
corresponde ao quadrado do vetor original */
const quadrados = nros.map(n=> n**2)
console.log('Vetor original: ', nros)
console.log('Vetor com quadrados: ', quadrados)


/* map() que transforma os elementos do vetor original em itens 
de lista para uso em uma página HTML (aplicação frequente em React)*/
const intensLista = nomes.map(nome=> `<li>${nome}</li>`)
console.log('<h1>Os nomes mais bonitos do Brasil/h1>')
console.log('<ul>')
for (let i of intensLista) console.log(i)
console.log('</ul>')