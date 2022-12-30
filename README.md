# Store manager

[Trybe](https://www.betrybe.com/) is a technology school focused on training Web Developers and the Store Manager project was proposed as an activity to improve studies on back-end development.

## Description

The developed application is a sales management system where it should be possible to create, update, read and delete products and sales.

## Technologies and Tools
<div>
    <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"/>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs"/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="docker"/>
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express"/>
    <img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha"/>
    <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="Swagger"/>
</div>

<br>

The elaboration of the RESTful API used the **Model-Service-Controller(MSC)** architecture, in addition to the following tools:

- [Node.JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)

In the development of unit tests was used:

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

**Note**: The SQL scripts _migration.sql_ and _seed.sql_ for creating the *StoreManager* database were provided by [Trybe](https://www.betrybe.com/).

## ⚙️ How to use

To run the application, start by making a clone of this repository with the command below.

    git clone git@github.com:larissaperinoto/store-manager.git

Navigate to the project root.

    cd store-manager/
    
<details>
   <summary><strong>Running locally</strong></summary> 
  </br>
  
  <strong>Obs:</strong> To run the application this way you must have [Node](https://nodejs.org/en/) installed on your machine.
 
  In the root of the project run the command below to install the dependencies.

    npm install

 To upload the server with <strong>nodemon</strong> use the command below in the terminal of the <strong>store_manager</strong> container.
    
    npm run debug
    
 Login to the database using your credentials.
 
    mysql -u <your-username> -p
 
 Run the <strong>migration.sql</strong> and <strong>seed.sql</strong> scripts to create the <strong>Store Manager</strong> database.

 Now we can run the tests using the command below.
  
    npm run test:mocha
    
</details>
    
<details>
   <summary><strong>Running with Docker</strong></summary> 
  </br>
  
  <strong>Obs.:</strong> To run the application this way you must have [Docker](https://www.docker.com/) installed on your machine.
  
 In the root of the project, upload the <strong>store_manager</strong> and <strong>store_manager_db</strong> containers using docker-compose.

    docker-compose up -d
    
  Open the <strong>store_manager</strong> container terminal.

     docker exec -it store_manager bash

 Once in the container terminal, run the command below to install the dependencies.

    npm install
    
 To start the server with <strong>nodemon</strong> use the command bellow in the terminal of the <strong>store_manager</strong> container.
    
    npm run debug
    
 To connect with database, open the <strong>store_manager_db</strong> container terminal.
  
    docker exec -it store_manager_db bash
    
 Login to the database using the credentials described in the <strong>docker-compose.yaml</strong>.
 
    mysql -u root -p
 
 Run the <strong>migration.sql</strong> and <strong>seed.sql</strong> scripts to create the <strong>Store Manager</strong> database.

 We can run all tests using the command bellow in the terminal of the <strong>store_manager</strong> container.
  
    npm run test:mocha
    
</details>

## Routes

 You can check all the routes by accessing the /docs endpoint in your browser when running the application.

<details>
    <summary>Routes preview</summary>
    
![Captura de tela de 2022-12-30 11-23-11](https://user-images.githubusercontent.com/98956659/210083904-17a7e8db-bf09-4f7f-9dc4-8f1cf06a05c2.png)

    
</details>
    
---
 
Developed by [Larissa Perinoto](www.linkedin.com/in/larissaperinoto), © 2022.
