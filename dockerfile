# Use uma imagem base do Node.js
# rodar o docker-compose up --build
FROM node:14-alpine

# Cria um diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Compila o projeto
RUN npm run build

# Define a variável de ambiente para produção
ENV NODE_ENV production

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
