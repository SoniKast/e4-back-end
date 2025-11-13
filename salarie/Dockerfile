FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY src/ ./src/

# Construire l'application
RUN npm run build

# Exposer le port gRPC
EXPOSE 50051

# Démarrer l'application
CMD ["npm", "run", "start:prod"]