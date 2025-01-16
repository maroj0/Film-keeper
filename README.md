Backend NestJS con Docker y MongoDB
Este proyecto está construido utilizando NestJS y MongoDB, y se ejecuta en un contenedor Docker. Sigue los pasos a continuación para levantar el entorno de desarrollo.

Requisitos
Docker
Docker Compose
Node.js (si prefieres correr el proyecto fuera de Docker)
Variables de entorno
Este proyecto requiere las siguientes variables de entorno:

DATABASE_URI: URI de conexión a la base de datos MongoDB (e.g., mongodb://mongo:27017/mydb).
PORT: Puerto en el que el servidor de NestJS correrá (e.g., 3000).
JWT_SECRET: Secreto para la firma de los JSON Web Tokens (JWT).
Paso 1: Clonar el repositorio
Primero, clona el repositorio en tu máquina local:

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Paso 2: Crear el archivo .env
Crea un archivo .env en la raíz del proyecto con las variables de entorno necesarias:

DATABASE_URI=mongodb://mongo:27017/mi_base_de_datos
PORT=3000
JWT_SECRET=tu_secreto_aqui
Asegúrate de reemplazar los valores de las variables por los correspondientes a tu entorno.

Paso 3: Levantar los contenedores con Docker Compose
El proyecto utiliza docker-compose para levantar tanto el backend como el servicio de MongoDB. Para ejecutar todo el sistema, usa el siguiente comando:

docker-compose up --build
Este comando construye y levanta los contenedores de Docker según lo definido en el archivo docker-compose.yml.

MongoDB correrá en el contenedor mongo.
El backend de NestJS se expondrá en el puerto que hayas configurado en el archivo .env (por defecto, en el puerto 3000).
Paso 4: Acceder al Backend
Una vez que los contenedores estén en ejecución, puedes acceder a la aplicación backend en:

http://localhost:3000
Donde 3000 es el puerto configurado en tu archivo .env.

Paso 5: Ejecutar Docker (opcional)

Dockerfile
Si necesitas personalizar el contenedor de Docker para NestJS, aquí tienes un ejemplo básico de un Dockerfile:


Paso 6: Detener los contenedores
Cuando ya no necesites los contenedores activos, puedes detenerlos con:


docker-compose down
Esto detendrá y eliminará los contenedores y redes definidos en el archivo docker-compose.yml.
