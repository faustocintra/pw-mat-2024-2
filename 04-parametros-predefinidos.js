// Função que calcula a área de um triângulo, retângulo ou elipse

// Tipo é um parâmetro predefinido, que recebe o valor 'T' por padrão
// Se o tipo não for informado, a função retorna null
function calcArea(base, altura, tipo) {
    switch (tipo) {
        case 'T': // Triângulo
            return base * altura / 2;
        case 'R': // Retângulo
            return base * altura;
        case 'E': // Elipse
            return (base / 2) * (altura / 2) * Math.PI;
        default: // Tipo inválido
            return null
    }
}

console.log(`A área de um triângulo de base 10 e altura 5 é ${calcArea(10, 5, 'T')}.`);
console.log(`A área de um retângulo de base 10 e altura 5 é ${calcArea(10, 5, 'R')}.`);
console.log(`A área de uma elipse de base 10 e altura 5 é ${calcArea(10, 5, 'E')}.`);
console.log(`A área de uma figura inválida de base 10 e altura 5 é ${calcArea(10, 5, 'X')}.`);

// Chamando a função sem informar o tipo
// O parâmetro tipo recebe o valor predefinido 'T'
// entenda como se fosse calcArea(10, 5, 'T')

console.log(`A área de um triângulo de base 10 e altura 5 é ${calcArea(10, 5)}.`);