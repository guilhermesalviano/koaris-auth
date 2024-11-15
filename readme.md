# Koaris Auth Project
## Arquitetura
Clean Architecture:
<img src="./.docs/architecture.PNG" alt="Arquitetura" >
## Estrutura do Projeto
```plaintext
├── src
│   ├── config
│      └── auth.ts
│   ├── core
│      ├── controllers
│      ├── entities
│      └── middleware.ts
│   ├── infra
│      ├── http
│         ├── adapters
│         ├── factories
│         ├── responses
│         ├── routes
│         ├── app.ts
│         └── server.ts
│      └── prisma
│         └── client.ts
│   ├── modules
│      └── users
│   └── test
├── prisma
│   ├── migrations
│   └── schema.prisma
├── README.md
└── package.json
```

## Instalação
#### Pré-requisitos
- Node.js >= 22.x
- Npm

#### Passos de Instalação
1. Clone o repositório:
```bash
git clone git@github.com:guilhermesalviano/koaris-auth.git
```
2. Entre na pasta do projeto:
```bash
cd koaris-auth
```
3. Instale as dependências:
```bash
npm install
```
4. Configure as variáveis de ambiente:

Crie um arquivo .env baseado no .env.example e adicione suas configurações (banco de dados, credenciais de API, etc.).
5. Execute o projeto:
```bash
npm run dev
```
6. Acesse o projeto em http://localhost:3333

## Docker

Init docker file

build the image with
```shellscript
docker build -t koaris-auth .
```

and you can use the image with
```shellscript
docker run -p 3333:3333 -d koaris-auth
```
to see others containers ou get logs
```shellscript
docker ps -a
docker logs {IdContainer}
docker rm <container_id>
```

using docker-compose - only to locally or staging containers
```shellscript
docker-compose up --build -d
docker-compose up -d
docker-compose down
```

## Usando o terraform
using terraform
```shellscript
terraform init
terraform plan
terraform apply
--
terraform destroy
```

## Usando o Prisma:
1. Instale o prisma e inicie.
```bash
npm install @prisma -D
npx prisma init
```
2. Configure seu schema com o arquivo que foi iniciado.
2.1. Configure seu .env com a URL de conexão.

3. Crie migration files
```bash
npx prisma migrate dev --name migrations
```
4. Ative as migrations
```bash
npx prisma generate
```
5. Rodar as migrations novamente
```bash
npx prisma migrate reset
```
6. Para rodar as migrations em um novo Database
```bash
npx prisma migrate deploy
```
Fim.