const numeros = [1, 2, -3, 4, 5, -6, 7, 8, 9, 10];
const frutas = ['banana', 'maçã', 'laranja', 'melancia', 'abacaxi', 'uva'];

// Números negativos
const negativos = numeros.filter(n => n < 0);
console.log("Números negativos:", negativos);

// Números pares
const pares = numeros.filter(n => n % 2 === 0);
console.log("Números pares:", pares);

// Números maiores que 20
const maioresQue20 = numeros.filter(n => n > 20);
console.log("Números maiores que 20:", maioresQue20);

// Frutas que começam com a letra 'm'
const frutasComM = frutas.filter(f => f.charAt(0) === 'm');
console.log("Frutas que começam com 'm':", frutasComM);

// Frutas que terminam com a letra 'i'
const frutasComI = frutas.filter(f => f.slice(-1) === 'i');
console.log("Frutas que terminam com 'i':", frutasComI);

// Frutas que terminam com a letra 'r'
const frutasComR = frutas.filter(f => f.slice(-1) === 'r');
console.log("Frutas que terminam com 'r':", frutasComR);