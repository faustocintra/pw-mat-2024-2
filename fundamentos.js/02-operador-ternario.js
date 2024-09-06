let media = 8.3, resultado;
if (media >=6){
    resultado = 'APROVADO'
}else{
    resultado='REPROVADO'
}
console.log(media, '=>', resultado)


//Usando operador ternário
resultado = media>= 6 ? 'APROVADO' : 'REPROVADO'
console.log(media, '=>', resultado)

let user = 'guest, msg'
/*
Quando há apenas uma linha após um if, um else, um while, etc. podemos omitir as chaves.
*/
if (user ==='admin') msg = 'Seja bem-vindo!'
else msg = 'Acesso negado'
//Duas variáveis avulsas, observe a saída no console.
console.log(user,msg)

//Equivalente ao if. .Else acima, usando operador ternário.
msg = user === 'admin' ? 'Seja bem-vindo' : 'Acesso negado'
//Veja que agora, as variáveis estao entre {}. Observe a 
//diferença na daída no terminal.
console.log({user,msg})