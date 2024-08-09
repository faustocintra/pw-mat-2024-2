let media = 5, resultado
if (media >= 6) {
    resultado = 'APROVADO'
} else {
    resultado = 'REPROVADO'
}
console.log(media, '=>', resultado)

// usando operador ternario 
resultado = media >= 6 ? 'APROVADO' : 'REPROVADO'

console.log(media, '=>', resultado)
