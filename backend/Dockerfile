# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del backend a /app
COPY . .

# Instala TypeScript globalmente
RUN npm install -g typescript

# Instala las dependencias
RUN npm install

# Expón el puerto en el que se ejecuta la aplicación
EXPOSE 4040

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"] # Ajusta esto según tu script de inicio