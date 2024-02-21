# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del backend a /app
COPY . .

# Instala TypeScript globalmente
RUN npm install -g typescript nodemon

# Instala las dependencias

RUN npm install

RUN npm install bcrypt @types/bcrypt

RUN apt-get update && apt-get install -y build-essential

# Expón el puerto en el que se ejecuta la aplicación
EXPOSE 4040

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"] # Ajusta esto según tu script de inicio