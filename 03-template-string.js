const nome = 'Rafaela'
const idade = 19
const cidade = 'Franca/SP'
/*
diferença entre const, var e let:
 const é uma constante que quando vc declara, vc não pode mudar depois-- NÃO É MUTAVEL
 let é para declarar uma variavel que vc precisa mudar depois -- É MUTAVEL
 var é uma bagunça-> deixa ter 2 variaveis com o mesmo o nome e etc-----> NÃO USAR 
*/

//mesclando strings como variaveis usando concatenação 
console.log('Meu nome é ' + nome + ', tenho ' + idade + ' anos e moro em ' + cidade + '.')

//mesclando string e variaveis com template string 
//string templates são OBRIGATORIAMENTE delimitados por `` (acentos graves)
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`)

//dentro de uma tamplate string, não estamos limitados a usar apenas 
//variaveis dentro do simbolo ${}. Na verdade, qualquer codigo JS valido pode ser usado ali 
console.log(`DAQUI 7 ANOS, ${nome.toUpperCase()} TERÁ ${idade + 7} ANOS.`)