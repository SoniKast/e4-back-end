# E4 Backend - Architecture Microservices avec gRPC

## Architecture

Cette application utilise une architecture microservices avec les composants suivants :

### Services

1. **Frontend Service** (Next.js)
   - Port : 3000
   - Interface utilisateur React/Next.js
   - Communique avec l'API via le reverse proxy

2. **Intervention Service** (NestJS)
   - Port : 5000
   - API REST pour la gestion des interventions, projets, clients, matériels
   - Client gRPC pour communiquer avec le service SALARIE
   - Authentification JWT

3. **Salarie Service** (NestJS)
   - Port : 50051
   - Microservice gRPC pour la gestion des salariés
   - Non exposé publiquement (communication interne uniquement)

4. **Nginx Reverse Proxy**
   - Port : 80
   - Point d'entrée unique
   - Route les requêtes vers les services appropriés

5. **PostgreSQL Database**
   - Port : 5432
   - Base de données partagée avec séparation logique

### Flux de Communication

```
Client → Nginx (port 80) → Frontend Service (port 3000)
Client → Nginx (port 80) → /api → Intervention Service (port 5000)
Intervention Service → gRPC → Salarie Service (port 50051)
```

## Structure du Projet

```
e4-back-end/
├── docker-compose.yml          # Orchestration des services
├── nginx/
│   └── nginx.conf             # Configuration du reverse proxy
├── frontend/                  # Service Frontend (Next.js)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── intervention/              # Service Intervention (NestJS)
│   ├── Dockerfile
│   ├── package.json
│   ├── proto/
│   │   └── salarie.proto     # Contrat gRPC
│   └── src/
│       ├── grpc-clients/
│       │   └── salarie.client.ts
│       └── intervention/
└── salarie/                   # Service Salarie (NestJS gRPC)
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── proto/
        │   └── salarie.proto
        └── salarie/
```

## Démarrage

### Prérequis

- Docker
- Docker Compose

### Lancement de l'application

```bash
# Construire et démarrer tous les services
docker-compose up --build

# Démarrer en arrière-plan
docker-compose up -d --build

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

### Accès aux services

- **Application** : http://localhost
- **API Documentation** : http://localhost/api/docs
- **Base de données** : localhost:5432

## Développement

### Variables d'environnement

Les variables d'environnement sont configurées dans le `docker-compose.yml` :

- `DATABASE_URL` : URL de connexion PostgreSQL
- `SALARIE_GRPC_URL` : URL du service gRPC SALARIE
- `NEXT_PUBLIC_API_URL` : URL de l'API pour le frontend

### Communication gRPC

Le service INTERVENTION communique avec le service SALARIE via gRPC :

```typescript
// Exemple d'utilisation du client gRPC
const salarie = await this.salarieGrpcClient.getSalarie(salarieId);
```

### Ajout de nouvelles méthodes gRPC

1. Modifier le fichier `proto/salarie.proto`
2. Mettre à jour le contrôleur gRPC dans le service SALARIE
3. Mettre à jour le client gRPC dans le service INTERVENTION

## Tests

```bash
# Tests du service INTERVENTION
cd intervention
npm test

# Tests du service SALARIE
cd salarie
npm test
```

## Monitoring

Les logs de tous les services sont accessibles via :

```bash
docker-compose logs [service-name]
```

## Sécurité

- Le service SALARIE n'est pas exposé publiquement
- Communication gRPC sécurisée entre services
- Headers de sécurité configurés dans Nginx
- Authentification JWT pour l'API REST

## Avantages de cette Architecture

1. **Séparation des responsabilités** : Chaque service a un domaine métier précis
2. **Scalabilité** : Services déployables indépendamment
3. **Performance** : Communication gRPC optimisée
4. **Sécurité** : Isolation des services sensibles
5. **Maintenabilité** : Code modulaire et testable

## Inconvénients

1. **Complexité** : Plus de composants à gérer
2. **Debugging** : Traces distribuées plus complexes
3. **Latence** : Appels réseau supplémentaires
4. **Courbe d'apprentissage** : Technologies gRPC et microservices