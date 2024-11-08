# Criação do projeto Karangos

No terminal, execute

  npm create vite@latest

Perguntas feitas pelo comando:
* OK to proceed? Y
* Project name: karangos
* Select a framework: React (use a seta para baixo para selecionar)
* Select a variant: JavaScript + SWC

# Instalação do react-router-dom

O pacote react-router-dom é responsável por gerenciar a navegação e links dentro da aplicação. Para instalá-lo, execute no terminal:

  cd karangos

  npm install react-router-dom

# Instalação das dependências

Verifique se está dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal). Em seguida, no terminal:

  npm install

Este procedimento também é necessário caso você baixe o código-fonte de um repositório do GitHub.

# Executando o projeto

Verifique se está dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal). Em seguida, no terminal:

  npm run dev

# Instalação da biblioteca Material UI

(Se o projeto estiver sendo executando, derrube-o teclando Ctrl+C no terminal.)

Verifique se está dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal). Em seguida, no terminal:

  npm install @mui/material @emotion/react @emotion/styled

# Instalação das fontes Roboto

Verifique se está dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal). Em seguida, no terminal:

  npm install @fontsource/roboto

Em seguida, cole as linhas seguintes no topo do arquivo App.jsx:

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

# Instalação dos ícones Material

Verifique se está dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal). Em seguida, no terminal:

  npm install @mui/icons-material
