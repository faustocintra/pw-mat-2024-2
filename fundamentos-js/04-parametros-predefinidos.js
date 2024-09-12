/*
  Função que calcula a área de uma figura geométrica plana,
  dados a base, a altura e o tipo de forma
*/

// tipo é um PARÂMETRO PREDEFINIDO, cujo valor default é 'R'.
// Se a função for chamada omitindo o terceiro parâmetro, ele
// assumirá o valor default 'R'
function calcArea(base, altura, tipo = 'R') {
  switch(tipo) {
    case 'R':     // Retângulo
      return base * altura
    case 'T':     // Triângulo
      return base * altura / 2
    case 'E':     // Elipse
      return (base / 2) * (altura / 2) * Math.PI
    default:      // Forma inválida/desconhecida
      return null
  }
}

console.log(`Área triângulo 10x30: ${calcArea(10, 30, 'T')}`)
console.log(`Área elipse (círculo) 7,5x7,5: ${calcArea(7.5, 7.5, 'E')}`)
console.log(`Área retângulo 8x15: ${calcArea(8, 15, 'R')}`)
console.log(`Área forma inválida 12x18: ${calcArea(12, 18, 'W')}`)

// Chamada à função usando apenas dois parâmetros.
// Como o terceiro parâmetro é predefinido com o valor 'R', a função
// entenderá que deverá fazer o cálculo de área para um retângulo
console.log(`Área retângulo 7x16: ${calcArea(7, 16)}`)

/*
  REGRAS PARA O USO DE PARÂMETROS PREDEFINIDOS
  1) O parâmetro predefinido deve vir sempre POR ÚLTIMO na lista de
     parâmetros
  2) Pode haver mais de um parâmetro predefinido, mas eles devem ser
     sempre OS ÚLTIMOS na lista de parâmetros
*/