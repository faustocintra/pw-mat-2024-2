/*
Desestruturação é a operacao pela qual é possivel extrair valores de vetores e objetos, atribuindo-os a variaveis avulsos */
 
// 1) DESESTRUTURAÇÃO DE VETOR
const carros = ['Fusca', 'Chevete', 'opala']
 
//Desestruturação
const [carro1, carro2, carro3] = carros

/* Fazendo o mesmo sem desestruturação 

const carro1 = carros [0]
const Carro2 = carros [1]
const carro3 = carros [2]

*/

console.log({carro1, carro2, carro3})

//Desestruturação parcial: 1° e 2° valores
const[a1, a2] = carros
console.log({a1, a2})

//Desestruturação parcial: 1° e 3° valores
const[b1, b3] = carros
console.log({b1, b3})

//Desestruturação parcial: 2° e 3° valores
const[, c2, c3] = carros
console.log({c2, c3})

/****************************************************************/

//Traço separador
console.log('-' .repeat(80))

//Problema: troca de valores de variáveis entre si: swap

let x = 10, y = 20
console.log({x,y})

//Modo clássico de fazer swap (usando varíavel auxiliar)
let aux = x
x = y
y = aux

//Usando desestruturação para fazer swap (note que os pontp-e-virgula)
//São necessárias nessas linhas e na anterior)
[x,y] = [y, x];

console.log({x, y})

/****************************************************************/
//Traço Separador
console.log('-' .repeat(80))
// 2) Desestruturação de Objetos
const pessoa = {
    nome: 'Orkutilson Orozimbo Ozório',
    sexo: 'M',
    dataNasc: ' 2010-04-29',
    email:'orkutilson@gmail.com'
}
/* Na desestruturação de objetos, as variáveis avulsas: 
-> DEVEM ter o MESMO NOME das propriedadades do objeto
-> Podem ser especificadas em qualquer ordem 
-> Pode ser feita a desestruturação parcial */

const {  sexo, nome, email} = pessoa
console.log({nome, sexo, email})