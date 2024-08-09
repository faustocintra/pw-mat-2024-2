let media = 8.3, resultado

if( media >= 6 ){
    resultado = 'APROVADO';
}
else{
    resultado = 'REPROVADO';
}

console.log('[TRAD] O aluno está: ' + resultado);

resultado = media >= 6 ? 'APROVADO' : 'REPROVADO';

console.log('[TERNÁRIO] O aluno está: ' + resultado);