const fullname = 'Fernando Daciuk';
const username = 'fdaciuk';
const group = 'professor';

// Criando um objeto a partir das variáveis acima, note que o nome das propriedades é igual ao nome das variáveis
const user = {
    fullname: fullname,
    username: username,
    group: group
}; 

console.log(user);

// Um objeto pode misturar propriedades abreviadas e propriedades comuns
const userInfo = {
    fullname,
    username,
    password: '123',
    group,
    last_login: new Date()
};

console.log(userInfo);

// Depuração usando propriedades abreviadas
const x = 10, y = 'caju';

// Observe que os valores são mostrados, mas a saída não informa de quais variáveis eles vieram
console.log(x, y);

// Usando propriedades abreviadas, é possível identificar de onde os valores vieram
console.log({ x, y });