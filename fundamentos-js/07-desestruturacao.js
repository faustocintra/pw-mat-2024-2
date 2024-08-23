/*
Desestruturação é a operação pela qual é possivel extrair valores de vetores
e objetos, atribuindo-os a variaveis avulsas
 */

//1) Desestruturação de vetor 
const carros = ['fusca', 'chevette', 'opala']

//desestruturação 
const [carro1, carro2, carro3] = carros

/*Fazendo o mesmo sem desestruturação 
const carro1 = carros[0]
const carro2 = carros[1]
const carro3 = carros[2]
*/

console.log({ carro1, carro2, carro3 })

//desestruturação parcial: 1° e 2° valores
const [a1, a2] = carros
console.log({ a1, a2 })

//desestruturação parcial: 1° e 3° valores
const [b1, , b3] = carros
console.log({ b1, b3 })

//desestruturação parcial: 2° e 3° valores
const [, c2, c3] = carros
console.log({ c2, c3 })

/***************************************************/
//traço separador
console.log('-'.repeat(80))

//PROBLEMA: troca de valores de variaveis entre si: SWAP
let x = 10, y = 20;
console.log({ x, y });

//Modo classico de fazer SWAP(usando variavel auxiliar)
/*
let aux =x
x=y
y=aux
*/

//usando desestruturaçaõ para fazer swap(note que os pontos-e-virgula)
//são necessarios nesta linha e na anterior

[x, y] = [y, x];
console.log({ x, y });

/****************************************************************/
//traços separador
console.log('-'.repeat(80))

//2) DESESTRUTURAÇÃO DE OBJETOS
const pessoa = {
    nome: 'Rafaela',
    sexo: 'F',
    dataNasc: '2005-06-18',
    email: 'rafinha@gmail.com'
}

/*
Na desestruturação de objetos, as variaveis avulsas:
~> DEVEM ter o MESMO NOME das propriedades do objeto
~> Podem ser especificadas em qualquer ordem 
~> Pode ser feita a desestruturação parcial
 */

const { sexo, nome, email } = pessoa
console.log({ nome, sexo, email })

