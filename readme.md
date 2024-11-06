## Usando o Prisma:
1. Instale o prisma e inicie.
```bash
npm install @prisma -D
npx prisma init
```
2. Configure seu schema com o arquivo que foi iniciado.
2.1 Configure seu .env com a URL de conexão.

3. Crie migration files
```bash
npx prisma migrate dev --name migrations
```
4. Ative as migrations. 
```bash
npx prisma generate
```
Fim.