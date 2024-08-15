/*
funçao que calcula a area de uma figura geometrica plana,
dados a base, a altura e o tipo da figura 

tipo é um PARAMETRO PREDEFINIDO, cujo o valor default é 'R'.
se a função for chamada omitindo o terceiro parametro, ele assumira o valor default 'R'
*/
function calcArea(base, altura, tipo = 'R') {
    switch (tipo) {
        case 'R': //retangulo
            return base * altura
            break;
        case 'T': //triangulo
            return base * altura / 2
            break;
        case 'E': //Elipse
            return (base / 2) * (altura / 2) * Math.PI
        default: //forma inavalida/desconhecida
            return null
            break;
    }
}
console.log(`Área Triângulo 10 x 30: ${calcArea(10, 30, 'T')}`)
console.log(`Área Elipse(circulo) 7,5 x 7,5: ${calcArea(7.5, 7.5, 'E')}`)
console.log(`Área Retangulo 8 X 15: ${calcArea(8, 15, 'R')}`)
console.log(`Área forma invalida 12 x 18: ${calcArea(12, 18, 'W')}`)

/*
chama a função usando apenas dois parametros.
como o terceiro parametro é predefinido com o valor 'R', a função
entendera que devera fazer o calculo de area  para um retangulo 
*/
console.log(`Área Retangulo 8 X 15: ${calcArea(8, 15)}`)
/*
REGRAS PARA O USO DE PARAMETROS PREDEFINIDOS
 1) o parametro predefinidos deve vim sempre POR ULTIMO na lista de parametros
 2) pode haver mais de um parametros predefinidos, mas eles devem ser sempre OS ULTIMOS NA LISTA de parametros 
*/


