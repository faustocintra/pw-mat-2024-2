// Encontrando o maior e o menor número em uma série
/* let minimo = Math.min(2, -7, 8, 4, 0);
let maximo = Math.max(2, -7, 8, 4, 0);

console.log({ minimo, maximo });

// E se estes números estiverem em um vetor?
const nums = [2, -7, 8, 4, 0];

minimo = Math.min(...nums);
maximo = Math.max(...nums);

console.log(minimo, maximo);
*/

const carro1 = {
  modelo: "Fiorino",
  marca: "Fiat",
  cor: "preto",
  ano: 1970,
};

const carro2 = { ...carro1 };

carro2.modelo = "Fusca";
carro2.marca = "Volkswagen";
carro2.cor = "preto";
carro2.ano = 1968;

console.log({ carro1, carro2 });

// ***********************************************************

// PROBLEMA: JUNTAR DOIS OU MAIS VETORES EM UM TERCEIRO VETOR

const frutas = ["maça", "banana", "laranja"];
const verduras = ["alface", "couve", "rúcula"];

// Juntando os dois vetores usando JS "classico" (anterior a 2015)
// const hortifruti = frutas.concat(verduras);

// Usando espalhamento para unir vetores
const hortifruti = [...frutas, ...verduras];

console.log(hortifruti);

// ***********************************************************

// PROBLEMA: escrever uma função que recebe um número arbitrario de parametros

function soma(...nums) {
  let resultado = 0;
  for (let n of nums) resultado += n;
  return resultado;
}

console.log("Soma 7 números:", soma(1, 2, 3, 4, 5, 6, 7));
console.log("Soma 12 números:", soma(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
