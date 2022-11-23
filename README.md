# NGCash

Consiste em uma aplicação full-stack dockerizada, para realização de transferências monetárias entre usuários cadastrados na plataforma.
Nele, podemos visualizar as informações de usuários, contas, saldo e transações. Ademais, é possível realizar filtros no que diz respeito aos cash-outs, cash-ins e datas.


### BackEnd:

* Construído com Node.js, Express, Typescript, Sequelize, Postgres e Docker
* Utilizando os princípios SOLID e Programação Orientada a Objetos
* Aplicando Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores

### FrontEnd:
* Construído com React, Context API, React Hooks, Typescript e TailWind

### Instruções

- Para rodar a aplicação localmente e os testes do backend, realize o clone do projeto e utilize os comandos a seguir:

```
Para clonar o projeto:
git clone git@github.com:felmartins1985/NGCash.git

Para rodar a aplicação dockerizada, instalar as dependências e iniciar as aplicações:
<-- na raiz do projeto -->
cd app && npm run compose:up // para subir o docker-compose
docker exec -it app_backend /bin/sh // para acessar o container do backend
npm run db:reset // para criar as tabelas e popular no banco de dados
exit // para sair do container do backend

Para parar a aplicação dockerizada:
<-- na raiz do projeto -->
cd app && npm run compose:down // para parar os containers
```

<details>
  <summary><strong>A aplicação já contém alguns usuários criados:</strong></summary><br />
  
 | Usuário | Senha |
|---|---|
| `Felipe` | Gui12345 |
| `Dani` | Dani1234 |
| `Gui` | Dani1234 |
 
</details>

### Endpoints

#### Usuários

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna todos os usuários | http://localhost:3001/users |
| `POST` | Realiza o login do usuário, retornando um token | http://localhost:3001/login |
| `POST` | Realiza o cadastro de um novo usuário, retornando um token | http://localhost:3001/register |

Nas requisições POST é necessário informar o seguinte JSON:

```
{
	"username": "Felipe",
	"password": "Gui12345"
}
```

#### Conta

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna o número da conta e saldo do usuário | http://localhost:3001/account/:id |


#### Transações

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna as transações que o usuário está presente filtradas | http://localhost:3001/filter?params=1&type=creditedAccountId |
| `POST` | Criar uma nova transação monetária entre usuários (Cash-Out, Cash-In) | http://localhost:3001/transactions |
| `GET` | Retorna todas as transações do usuário (Cash-Out, Cash-In) | http://localhost:3001/transactions/:id |

Na requisição POST é necessário informar o seguinte JSON:

```
{
		"userCredited": "Felipe",
		"userDebited": "Dani",
		"value": 10
}
```
