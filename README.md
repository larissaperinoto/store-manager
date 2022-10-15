# Store manager

A [Trybe](https://www.betrybe.com/) é uma escola de tecnologia com foco em formação de Desenvolvedores Web e o projeto App de Receitas foi proposto como atividade de aprimoramento dos estudos sobre desenvolvimento back-end. 

### Objetivo

A aplicação foi desenvolvida é um sistema de gerenciamento de vendas onde seve ser possível criar, atualizar, visualizar e deletar produtos e vendas.

### Tecnologias e Ferramentas

A API RESTfull foi desenvolvida em Node.JS utilizando o framework [Express](https://expressjs.com/pt-br/). Também foi utilizada a arquitetura Model-Service-Controller(MSC) e o MySQL para a gestão de dados. O [Docker](https://www.docker.com/) foi utilizado para criar o ambiente de desenvolvimento da aplicação.

Para a elaboração dos testes, foram utilizadas as ferramentas [mocha](https://mochajs.org/), [chai](https://www.chaijs.com/) e [sinon](https://sinonjs.org/).

Os scripts SQL **migration.sql** e **seed.sql** para criação do banco de dados **StoreManager** foram disponibilizados pela [Trybe](https://www.betrybe.com/).

### Execução

Faça o clone deste repositório com o comando abaixo.

    git clone git@github.com:larissaperinoto/store-manager.git

Na raíz do projeto, suba os containers `store_manager` e `store_manager_db` utilizando o docker-compose.

    docker-compose up -d
    
Abra o terminal do container `store_manager`.

    docker exec -it store_manager bash

Uma vez no terminal do container, execute o comando `npm install`.

Para subir o servidor utilize o comando abaixo no terminal do container `store_manager`.
    
    npm run debug
    
 Para se conectar com o banco de dados, abra o terminal do container `store_manager_db`.
  
    docker exec -it store_manager_db bash
    
 Faça login no banco de dados utilizando as credencias descritas no arquivo **docker-compose.yaml**. E execute os scripts **migration.sql** e **seed.sql** para a criação do banco **Store Manager** 

Agora podemos rodar os testes utilizando o comando abaixo no terminal do container `store_manager`.
  
    npm run test:mocha
 
