# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY package.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY config ./config
COPY src ./src
RUN npm install
COPY . .
RUN npm run build


# Build the image as production
# So we can minimize the size
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
COPY package.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY config ./config
COPY src ./src
ENV PORT=4000

ENV NODE_ENV=Production
ENV DATABASE_URI=mongodb://mongo:27017/mi_base_de_datos
ENV JWT_SECRET=CONEXA123!
RUN npm install
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start"]