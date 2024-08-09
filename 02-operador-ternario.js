let media = 8.3,
  resultado;

if (media >= 6) {
  resultado = "Aprovado";
} else {
  resultado = "Reprovado";
}

console.log(media, "=>", resultado);

// Usando opeador ternário
resultado = media >= 6 ? "Aprovado" : "Reprovado";
console.log(media, "=>", resultado);
