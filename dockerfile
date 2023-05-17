
FROM node:16
#Creacion de directorios con permisos
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
#Directorio de trabajo
WORKDIR /home/node/app
#Estableciendo usuario
USER root
# Generate enviroments
ARG TOKEN_GIT
# Clone repository
RUN git clone -b develop https://${TOKEN_GIT}@github.com/IngenieroCesar/api-criptoinvestment.git
#Directorio de trabajo
WORKDIR /home/node/app/api-criptoinvestment
# Add secrets
COPY config/secrets ./config/secrets
#NestJs Instalation
RUN npm i -g @nestjs/cli
#Dependencies instalation
RUN npm install -y
# RUN npm audit fix
RUN npm run build
#Comand
CMD ["node", "dist/main"]