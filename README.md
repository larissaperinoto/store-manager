# Store manager

A [Trybe](https://www.betrybe.com/) é uma escola de tecnologia com foco em formação de Desenvolvedores Web e o projeto Store Manager foi proposto como atividade de aprimoramento dos estudos sobre desenvolvimento back-end. 

## Objetivo

A aplicação desenvolvida é um sistema de gerenciamento de vendas onde deve ser possível criar, atualizar, visualizar e deletar produtos e vendas.

## Tecnologias e Ferramentas
<div>
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs"/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="docker"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express"/>
    <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha"/>
</div>

<br>

Na elaboração da API RESTful utilizou-se a arquitetura **Model-Service-Controller(MSC)**, além das seguintes ferramentas:

- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

Para a elaboração dos testes unitários da aplicação, foi utilizado:
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

**Obs.**: Os scripts SQL _migration.sql_ e _seed.sql_ para criação do banco de dados *StoreManager* foram disponibilizados pela [Trybe](https://www.betrybe.com/).

## ⚙️ Execução

Para executar a aplicação localmente, inicie realizando o clone deste repositório com o comando abaixo.

    git clone git@github.com:larissaperinoto/store-manager.git

Na raíz do projeto, suba os containers **store_manager** e **store_manager_db** utilizando o docker-compose.

    docker-compose up -d
    
Abra o terminal do container **store_manager**.

    docker exec -it store_manager bash

Uma vez no terminal do container, execute o comando `npm install`.

Para subir o servidor com o **nodemon** utilize o comando abaixo no terminal do container **store_manager**.
    
    npm run debug
    
 Para se conectar com o banco de dados, abra o terminal do container **store_manager_db**.
  
    docker exec -it store_manager_db bash
    
 Faça login no banco de dados utilizando as credencias descritas no arquivo **docker-compose.yaml**. E execute os scripts **migration.sql** e **seed.sql** para a criação do banco **Store Manager** 

Agora podemos rodar os testes utilizando o comando abaixo no terminal do container **store_manager**.
  
    npm run test:mocha
    
---
 
Desenvolvido por [Larissa Perinoto](www.linkedin.com/in/larissaperinoto), © 2022.
