# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Criação do projeto Karangos
No terminal, execute
mpm create vite@latest

Perguntas feitas pelo comando:
* OK to proceed? y
* Project name: karangos
* Select a framework: React (use a seta para baixo para selecionar)
* Select a variant? javascript + SWC

# instalação do react-router-dom
O pacote rect-router-dom é responsável por gerenciar a navegação e links dentro da aplicação. 
Para instalá-lo, execute no terminal:

cd karangos
npm instll react-router-dom


# instalação das dependências
Verifique se está dentro da pasta karangos( se não estiver, execute primeiro 'cd karangos' no terminal).
Em seguida, no terminal:

npm install

Este procedimento também é necessário caso você baixe o código-fonte de um repositório do Git-Hub.

# Executando o projeto
Verifique se está dentro da pasta karangos( se não estiver, execute primeiro cde karangos no terminal). 
Em seguida, no terminal:

npm run dev


# instalação da biblioteca material UI
(Se o projeto estiver sendo executado, derrube-o teclando Ctrl+C no terminal.)
Verifique se esta dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal) Em seguida no terminal:

npm install @mui/material @emotion/react @emotion/styled

# instalao das fontes Reboto
Verifique se esta dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal) Em seguida no terminal:

npm install @fontsource/roboto

Em seguida, cole as linhas seguintes no topo do arquivo App.jsx:
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

# instalação dos ícones Material
Verifique se esta dentro da pasta karangos (se não estiver, execute primeiro cd karangos no terminal) Em seguida no terminal:

npm install @mui/icons-material


acabou a instalação. digite 'npm run dev' para rodar




