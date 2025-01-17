# ---- Etapa 1: Construcción de la aplicación ----
FROM node:20-alpine AS builder


WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación NestJS
RUN npm run build

# ---- Etapa 2: Creación de la imagen de producción ----
FROM node:20-alpine AS production

WORKDIR /app

# Copiar solo los archivos necesarios para la ejecución
COPY package*.json ./
RUN npm install --production

# Copiar la carpeta `dist` generada en la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Configuración de variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV JWT_SECRET=your_jwt_secret
ENV DATABASE_URI=your_database_uri

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start:prod"]
