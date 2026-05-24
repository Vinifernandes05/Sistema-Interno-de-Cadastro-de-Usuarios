# 💼🖥️ Sistema Interno de Cadastro de Usuários

## 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento de um sistema interno de cadastro de usuários via terminal, utilizando JavaScript com Node.js.

O sistema permite realizar operações de cadastro, listagem, edição e exclusão de usuários, armazenando as informações em um arquivo JSON para persistência de dados.

Além disso, o projeto possui integração com a API pública ViaCEP, permitindo o preenchimento automático do endereço do usuário a partir do CEP informado.

A aplicação foi desenvolvida com foco em lógica de programação, manipulação de dados, validações e organização de código.

---

## 🎯 Objetivos do Projeto

- Praticar desenvolvimento com Node.js  
- Trabalhar com manipulação de arquivos JSON  
- Implementar operações CRUD via terminal  
- Desenvolver validações de dados  
- Consumir API externa utilizando JavaScript  
- Melhorar habilidades com lógica de programação  
- Organizar código em módulos separados  
- Simular um sistema interno de gerenciamento de usuários  

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

### 🔹 Backend
- Node.js  
- JavaScript  

### 🔹 Outros 
- Git  
- GitHub
- JSON 
- API ViaCEP  

---

## ⚙️ Funcionalidades

✔️ Cadastro de usuários via terminal  
✔️ Listagem de usuários cadastrados  
✔️ Edição de informações dos usuários  
✔️ Exclusão de usuários  
✔️ Armazenamento persistente em JSON  
✔️ Preenchimento automático de endereço via CEP  
✔️ Validações e restrições de cadastro  
✔️ Organização modular do sistema  

---

## 📂 Estrutura do Projeto

```bash
Sistema-Interno-de-Cadastro-de-Usuarios
│
├── Campos_usuarios.js # Interação com o usuário via terminal
├── Validar_usuarios.js # Funções de validação, restrições e regras do sistema
├── Dados_usuarios.json # Banco de dados (JSON)
│
└── README.md
```

---

## 🔄 Fluxo da Aplicação

1. Usuário interage com o sistema via terminal  
2. O sistema solicita os dados do usuário  
3. As informações passam por validações internas  
4. O CEP informado é consultado na API ViaCEP  
5. O endereço é preenchido automaticamente  
6. Os dados são armazenados no arquivo JSON  
7. O sistema permite listar, editar ou excluir usuários cadastrados  

---

## 🌐 Integração com API

O projeto utiliza a API pública ViaCEP para consulta automática de endereço através do CEP informado.

Os seguintes dados são preenchidos automaticamente:

- Rua  
- Bairro  
- Cidade  
- Estado  

Documentação da API:  https://viacep.com.br/

---

## ▶️ Como Executar o Projeto

### 1️⃣ Instalar o Node.js

Download oficial:  https://nodejs.org/pt-br

---

### 2️⃣ Clonar o Repositório

```bash
git clone https://github.com/Vinifernandes05/Sistema-Interno-de-Cadastro-de-Usu-rios.git
```

---

### 3️⃣ Acessar a Pasta do Projeto

```bash
cd Sistema-Interno-de-Cadastro-de-Usuarios
```

---

### 4️⃣ Executar o Sistema

```bash
node Campos_usuarios.js
```

---

## 📞 Contato

👤 **Vinicius Sousa Fernandes**

- 📧 Email: vinifernandes2005@gmail.com  
- 💼 LinkedIn: https://linkedin.com/in/viniciussousaf  
- 💻 GitHub: https://github.com/Vinifernandes05  

---
