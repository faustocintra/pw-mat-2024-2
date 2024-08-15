// Alguns dados de um usuário
const fullname = "Joniscleisson Junqueira Júnior";
const username = "junin";
const group = "alunos";

/*
    CRIANDO UM OBJETO A PARTIR DE VARIÁVEIS ACIMA
    Note que o nome das propriedades (à esquerda) coincide com o nome das variáveis (à direita)
*/
/* 
const user = { 
fullname: fullname,
username: username,
group: group
} 
*/

/*
    Criando um objeto equivalente ao comentado acima, usando propriedades abreviadas. Quando o nome
    das propriedades é idêntico ao das propriedades, não é necessária a repetição
*/
const user = {
  fullname,
  username,
  group,
};

console.log(user);

// Um objeto pode misturar propriedades abreviadas e não abreviadas
const userInfo = {
  fullname,
  username,
  password: "123456",
  group,
  last_login: "2024-09-23 20:20:20",
};

console.log(userInfo);

// DEPURAÇÃO USANDO PROPRIEDADES ABREVIADAS

const x = 10,
  y = "batata";

/*
Exibindo o valor de duas variáveis com console.log().
Observe que os valores são mostrados, mas a saída não
informa de quais variáveis provêm os valores
*/
console.log(x, y);

/*
Saída melhorada: passando um objeto formado pelas variáveis com propriedades abreviadas
para console.log(), conseguimos saber de onde vêm os valores
*/
console.log({ x, y });
