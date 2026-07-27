# 🍔 DevLanches • Sistema Completo para Lanchonetes

> Uma aplicação Full-Stack moderna para gerenciamento de cardápio, pedidos via carrinho flutuante e painel administrativo completo de produtos.

---

## 💻 Sobre o Projeto

O **DevLanches** é uma SPA (*Single Page Application*) desenvolvida para simular a experiência real de um sistema de delivery e gerenciamento para lanchonetes. O sistema conta com uma interface voltada ao cliente final para visualização dos produtos e montagem de pedidos, além de um painel administrativo protegido por rota para cadastro, edição e exclusão de itens do cardápio.

---

## ✨ Funcionalidades

### 📱 Visão do Cliente (`/`)
- **Cardápio Digital:** Listagem dinâmica dos lanches cadastrados no banco de dados.
- **Carrinho Flutuante Global:** Botão fixo no canto da tela que acompanha a rolagem do usuário com contador de itens (*badge*).
- **Gerenciamento de Pedido:** Adição, remoção e cálculo automático do valor total em tempo real via **Context API**.

### ⚙️ Painel Administrativo (`/admin`)
- **CRUD Completo de Produtos:** Cadastrar novos lanches, atualizar preços/descrições e remover itens.
- **Formulário Inteligente:** Componente reutilizável que se adapta dinamicamente entre os modos de *Cadastro* e *Edição*.
- **Tratamento de Erros:** Comunicação com a API tratada com `async/await` e blocos `try/catch` para garantir estabilidade.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **[React](https://react.dev/)** (Vite)
- **[React Router DOM](https://reactrouter.com/)** (Roteamento entre `/` e `/admin`)
- **Context API** (Gerenciamento de estado global do carrinho)
- **JavaScript (ES6+)** & CSS3 In-JS

### Back-end & Banco de Dados
- **[Node.js](https://nodejs.org/)**
- **[Express](https://expressjs.com/)**
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** (Banco de dados NoSQL em nuvem)
- **Mongoose** (ODM para modelagem de dados)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Git

### 1️⃣ Configurando o Back-end (API)

```bash
# Clone este repositório
$ git clone [https://github.com/seu-usuario/devlanches.git](https://github.com/seu-usuario/devlanches.git)

# Acesse a pasta do back-end
$ cd devlanches/backend

# Instale as dependências
$ npm install

# Inicie o servidor Node.js
$ node index.js
