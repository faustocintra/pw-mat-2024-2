const nome = 'Valcicleide'
const idade = 20
const cidade = 'Morro Alto de Cima/MG'

// Mesclando strings com variáveis usando concatenação
console.log('Meu nome é ' + nome + ', tenho ' + idade + ' anos e moro em ' + cidade + '.')

// Mesclando strings e variáveis com template string
// String templates são OBRIGATORIAMENTE delimitadas por `` (acentos graves)
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`)

// Dentro de uma template string, não estamos limitados a usar apenas 
// variáveis dentro do símbolo ${}. Na verdade, qualquer código JS válido pode ser usado ali
console.log(`DAQUI 7 ANOS, ${nome.toUpperCase()} TERÁ ${idade + 7} ANOS`)