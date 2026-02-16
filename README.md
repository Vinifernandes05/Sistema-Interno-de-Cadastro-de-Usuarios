# Sistema Interno de Cadastro de Usuários
Este projeto consiste em um sistema interno de cadastro de usuários desenvolvido em JavaScript (Node.js). O sistema permite gerenciar infomrações, cadastrar, listar, editar e excluir usuários via terminal, armazenando os dados em um arquivo JSON (Dados_usuarios.json). O endereço do usuário (Rua, Bairro, Cidade e Estado) é preenchido automaticamente a partir do CEP informado, utilizando a API pública "ViaCEP".

## Tecnologias Utilizadas

- Node.js
- JavaScript
- JSON para persistência de dados
- API pública ViaCEP

## Estrutura do Projeto

```
Sistema-Interno-de-Cadastro-de-Usuarios/
│
├── Campos_usuarios.js // Arquivo de interação com o usuaário.
├── Validar_usuarios.js // Arquivo de funções, validações e restrições.
├── Dados_usuarios.json // Arquivo que salva os dados do usuário cadastrado.
└── README.md // Descrição do projeto
```

## Como Executar o Projeto

1. Instalar o Node.js:
   <https://nodejs.org/pt-br>
   
2. Clonar o repositório:
   git clone <https://github.com/Vinifernandes05/Sistema-Interno-de-Cadastro-de-Usu-rios.git>

3. Acessar a pasta do projeto:
   cd Sistema-Interno-de-Cadastro-de-Usuarios

4. Executar o sistema:
   node Campos_usuarios.js 

## API Utilizada

O projeto utiliza a API pública "ViaCEP" para consultar automaticamente os dados de endereço a partir do CEP informado.
Documentação: https://viacep.com.br
   
