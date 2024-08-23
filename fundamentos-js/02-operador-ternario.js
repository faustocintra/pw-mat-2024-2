let media = 5, resultado
if (media >= 6) {
    resultado = 'APROVADO'
} else {
    resultado = 'REPROVADO'
}
console.log(media, '=>', resultado)

// usando operador ternario 
resultado = media >= 6 ? 'APROVADO' : 'REPROVADO'
//o dois pontos quer diser o senão
console.log(media, '=>', resultado)


//quando a apenas uma linha apos um if, um else, um while, etc., podemos omitir as chaves 

let user = "admin", msg
if (user === 'admin') msg = 'seja bem-vindo!'
else msg = 'Acesso negado'

//duas variaveis avulsas, observe a saída no terminal
console.log(user, msg)

//equivalente ao if..else acima usando operador ternario 
msg = user === 'admin' ? 'seja bem-vindo!' : 'Acesso negado'

//veja que, agora, as variaveis estão entre {}. observe a diferença na saida no terminal 
console.log({ user, msg })