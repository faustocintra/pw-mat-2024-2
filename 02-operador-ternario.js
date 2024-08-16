let media = 5, resultado
if (media >= 6) {
    resultado = 'APROVADO'
} else {
    resultado = 'REPROVADO'
}
console.log(media, '=>', resultado)

// usando operador ternario 
resultado = media >= 6 ? 'APROVADO' : 'REPROVADO'
//o dois pontos quer dizer o senão
console.log(media, '=>', resultado)
let user = 'guest', msg

//Quando ha apenas uma linha após o if, um else, um while, etc., podemos omitir as chaves
if(user === 'admin') msg= 'Seja bem-vindo'
else msg= 'Acesso negado'

//duas variaves avulsas, observe a saida no terminal
console.log(user, msg)

//equivalente ao if.else acima, usando operador ternario  
msg= user=== 'admin' ? 'Seja bem-vindo' : 'Acesso negado'
//observe que a agora as variaveis estao entre {}, veja a diferença na saida do terminal
console.log({user, msg})