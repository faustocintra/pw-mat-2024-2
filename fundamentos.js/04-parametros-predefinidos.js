/*
Função que calcula a área de uma figura geométrica plana, dados a base, a altura e o tipo de forma. 
*/
// tipo é um PARÂMETRO DEFINIDO, cujo valor default é 'R'.
//Se a função for chamada omitindo o terceiro parametro, ele 
// assumirá o valor default 'R'
function calcArea(base, altura, tipo = 'R'){
    switch(tipo){
        case 'R'://Retângulo
            return base * altura
        case 'T': // Triãngulo
        return base * altura / 2
        case 'E': //Elipse
        return (base / 2) * (altura / 2) * Math.PI
    default: // Forma inválida/desconhecida
        return null
    }
}
console.log(`Area triangulo 10 x 30: ${calcArea(10,30,'T')}`)
console.log(`Àrea elipse (círculo) 7,5x7,5: ${calcArea(7.5,7.5,'E')}`)
console.log(`Área retangulo 8x15: ${calcArea(8,15,'R')}`)
console.log(`Área forma inválida 12x18: ${calcArea(12,18,'W')}`)

//Chamada à funão usando apenas dois parametros.
//Como o terceiro parãmetro é prefdefinido com o valor 'R', a função 
//entenderá que deverá fazer o cálculo de área para um retãngulo.
console.log(`Área retângulo 7 x 16: ${calcArea(7,16)}`)

/*
REGRAS PAR AO USO E PARÂMETROS PREDEFINIDOS
1) O parâmetro predefinido deve vir sempre POR ÚLTIMO na lista de parâmetros.
2) Pode haver mais de um parãmetro predefinido, mas eles devem ser sempre OS ÚLTIMOS na lista de parâmetros
*/