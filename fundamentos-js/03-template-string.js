const nome = "Valcicleide";
const idade = 28;
const cidade = "Morro Alto de Cima/MG";

// Mesclando strings com variaveis usando concatenação
console.log(
  "Meu nome é " + nome + ", tenho " + idade + " anos e moro em " + cidade
) + ".";

// Mesclando strings e variáveis com template string
// String templates são obrigatoriamente delimitadas por `` (acentos graves)
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`);

// Dentro de ima template string, não estamos limitados a usar apenas variáveis dentro
// do simbolo ${}. Qualquer expressão é válida
console.log(`DAQUI 7 ANOS, ${nome.toUpperCase()} TERÁ ${idade + 7} ANOS.`);
