function quadrado(n){
    return n * n;
}

console.log('[TRAD] O quadrado de 3 é: ' + quadrado(3));

const quadrado2 = n => n * n;

console.log('[ARROW] O quadrado de 3 é: ' + quadrado2(3));

function calc(a, b, c){
    return a + b + c;
}

console.log('[TRAD] O resultado da soma é: ' + calc(1, 2, 3));

const calc2 = (a, b, c) => a + b + c;

console.log('[ARROW] O resultado da soma é: ' + calc2(1, 2, 3));

function msgError(){
    return 'ERRO FATAL!!!';
}

console.log('[TRAD] ' + msgError());

const msgError2 = () => 'ERRO FATAL!!!';

console.log('[ARROW] ' + msgError2());

let fatorial = function(n){ 
    let resultado = 1;
    for(let i = 1; i <= n; i++){
        resultado *= i;
    }
    return resultado;
}

console.log('[TRAD] O fatorial de 5 é: ' + fatorial(5));

let fatorial2 = n => {
    let resultado = 1;
    for(let i = 1; i <= n; i++){
        resultado *= i;
    }
    return resultado;
}

console.log('[ARROW] O fatorial de 5 é: ' + fatorial2(5));