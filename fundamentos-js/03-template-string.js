const nome = "João";
const idade = 25;
const cidade = "São Paulo";

// Mesclando strings com variáveis usando o operador de concatenação (+)
console.log("Meu nome é " + nome + ", tenho " + idade + " anos e moro em " + cidade + ".");

// Mesclando strings com variáveis usando template string
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`);

// Mesclando strings com expressões usando template string
console.log(`Daqui a cinco anos, ${nome.toUpperCase()} terá ${idade + 5} anos.`);
