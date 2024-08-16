/* desestruturação é a operação pela qual é possivel 
extrair valores de vetores e objetos, atribuindo-os a variáveis avulsas*/

//1) Desestruturação de vetor
let carros = ['Fusca', 'Chevete', 'Opala']

//desestruturação 
const [carro1, carro2, carro3] = carros 
/* fazendo o mesmo sem a destruturação:
const carro1 = carros[0]
const carro2 = carros[1]
const carro3 = carros[2]
*/
console.log ({carro1, carro2, carro3})

//desestruturação parcial: 1 e 2 valores 
const [a1, a2]= carros 
console.log({a1,a2})

//desestruturação parcial: 1 e 3 valores 
const [b1, , b3]= carros 
console.log({b1,b3})

//desestruturação parcial: 2 e 3 valores 
const [,c2, c3]= carros 
console.log({c2, c3})

/****************/
//Traço separador 
console.log('-'.repeat(80))

//PROBLEMA: troca de valores de variáveis entre si: SWAP
 let x = 10, y=20;
 console.log({x,y});

 //modo classico de fazer swap (usando variavel auxiliar)
//  let aux = x 
//  x=y
//  y=aux

//usando a desestruturação para fazer swap
[x,y] = [y,x];
 console.log({x,y});

 /****************/
//Traço separador 
console.log('-'.repeat(80))

//2)Dsestruturação de objetos 
const pessoa = {
    nome: 'Ana Júlia Andrade',
    sexo: 'F', 
    dataNasc: '2004-10-08',
    email: 'anajulia@gmail.com'
}

/* Na desestruturação de objetos as variaveis avulsas:
- devem ter MESMO NOME das propriedades do objeto
- podem ser especificadas em qualquer ordem 
- pode ser feita a desestruturação parcial 
*/
const {sexo, nome, email}= pessoa 
console.log({sexo, nome, email})