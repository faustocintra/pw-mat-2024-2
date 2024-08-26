//alguns dados de um usuario 
const fullName = 'Ana Julia Andrade'
const userName = 'Ana'
const group = 'alunos'
/*
CRIANDO UM OBJETO APARTIR DAS VARIAVEIS ACIMA
Note que o nome das propriedade (à esquerda) coincide com 
o nome das variaveis (à direita)

  const user = {
      fullName: fullName,
      userName: userName,
      group: group
  }
*/
/*Criando um objeto equivale ao comentado acima, usando propriedades abreviadas. quando o nome 
das propriedades é identico ao das propriedades, não é necessaria a repetiçaõ 
*/


const user = {
    fullName,
    userName,
    group
}

console.log(user)

// um objeto pode misturar propriedades abreviadas e não abreviadas 

const userInfo = {
    fullName,
    userName,
    password: 'ana1234',
    group,
    last_login: '2024-08-14 17:47:03'
}

console.log(userInfo)

// DEPURAÇÃO USANDO PROPRIEDADES ABREVIADAS

const x = 10, y = 'batata'

/*
Exibindo o valor de duas variaveis com console.log().
observe que os valores são mostrados, mas a saida nao 
informa de quais variaveis provem os valores
 */

console.log(x, y)

/*
saida melhorada: passando um objeto formado pelas variaveis como propriedades abreviadas
para o console.log(), conseguimos ver saber de onde vêm os valores
 */
console.log({ x, y })