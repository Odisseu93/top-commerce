# Top Commerce
![](https://img.shields.io/badge/status-em_desenvolvimento-orange)

## About / Sobre 
Personal project of a fictitious E-commerce,
with the goal of studying the architecture, creation, and maintenance of a full-stack application (backend and frontend, database, etc.).

*Projeto pessoal de um Ecommerce fictício,
com o objetivo de estudar a arquitetura, criação e manunteção de uma aplicação full stack (backend e frontend, banco de dados, ETC).*

## Tech stack / lista de tecnologias
As suas principais tecnologias, são:

- [Docker](https://docs.docker.com/)
---
### Frontend
  -  [React.js](https://react.dev/)
   - [TypeScript](https://www.typescriptlang.org/)
   - [Styled Components](https://styled-components.com/)
   - [Vite.Js](https://vitejs.dev/) 
---
### Backend 
  - [Express.Js](https://expressjs.com/pt-br/)
  - [Node.Js](https://nodejs.org/en)
  - [Sequilize - ORM](https://sequelize.org/docs/v6/getting-started/)
--- 
### Database / Banco de daddos
  - [MySQL 8.1](https://dev.mysql.com/)

## Run locally / Rodar localmente
### 1 - Clone
```bash
git clone https://github.com/Odisseu93/top-commerce
```

```bash
cd top-commerce
```

### 2 - Run Docker compose / execute o Docker compose 

```bash 
docker compose up -d # in the root directory of the project / na pasta raiz 
```

### 3 - Install the project dependencies locally / Instale as dependecias do projeto localmente 

```diff 
- Do not skip this step / Não pule esta esta etapa
```
<br>

**Front-end**
```bash 
cd app/front-end # in the root directory of the project / na pasta raiz 
```
```bash 
 yarn install  
```

**Back-end**
```bash 
cd app/back-end # in the root directory of the project / na pasta raiz 
```
```bash 
 yarn install  
```
### 4 - Locahost
After starting the server, access the port in your browser:
Depois de iniciar o servidor, acesse a porta no seu navegador:

**Swagger**
```bash
localhost:8080/docs/api/
```
**Front-end**
```bash
localhost:3000
```

**Database** `PORT: 3308`

### Filestruct / Estrutura de arquivos
**For illustration purposes only, be guided by the files and folder present in this repository / Meramente ilustrativo se guie pelo arquivos e pasta presente neste repositório**
<details>

<summary>Back-end</summary>

```
.
├── Dockerfile
├── nodemon.json
├── package.json
├── src
│   ├── controllers
│   │   ├── ProductCategoryController.ts
│   │   ├── ProductController.ts
│   │   └── ProductFilterController.ts
│   ├── db
│   │   └── mysql
│   │       └── index.ts
│   ├── docs
│   │   └── swagger.json
│   ├── helpers
│   │   └── ProductCategory
│   │       ├── Validate.ts
│   │       └── registeredProducts.ts
│   ├── models
│   │   ├── Product.ts
│   │   └── ProductCategory.ts
│   ├── routes
│   │   ├── ProductCategoryRoutes.ts
│   │   ├── ProductFiltersRoutes.ts
│   │   ├── ProductRoutes.ts
│   │   └── docsRoutes.ts
│   ├── server.ts
│   └── types
│       ├── TypedRequestBody.ts
│       ├── TypedRequestQuery.ts
│       ├── TypedResponseJson.ts
│       ├── controllers
│       │   ├── Product
│       │   │   ├── RequestCreateType.ts
│       │   │   ├── RequestUpdateType.ts
│       │   │   └── index.ts
│       │   └── ProductFilter
│       │       ├── ProductFilterPriceInBetweenRequestType.ts
│       │       ├── ProductFilterRequestType.ts
│       │       └── index.ts
│       └── models
│           ├── ProductCategory
│           │   └── index.ts
│           └── Products
│               └── index.ts
├── tsconfig.json
└── yarn.lock
```
</details>

<details>

<summary>Font-end</summary>

```
.
├── Dockerfile
├── README.md
├── index.html
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```
</details>



## Developer / Desenvolvedor

<div align="center">
  <img src="https://user-images.githubusercontent.com/76600539/235897309-88ab21df-d0be-4905-829c-36ab68ebc2e8.png" alt="developer: Ulisses Silvério"    width="200px" align="center"/>
</div>
<br>
<div align="center" margin="50px">
 <a href="https://linktr.ee/ulissessilverio" align="center">
  <img src="https://img.shields.io/badge/linktree-1de9b6?style=for-the-badge&logo=linktree&logoColor=white" alt="linktree shild" />
</a>
</div>




