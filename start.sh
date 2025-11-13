#!/bin/bash

# Script de démarrage pour l'architecture microservices E4

echo "🚀 Démarrage de l'architecture microservices E4..."
echo ""

# Vérifier que Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker pour continuer."
    exit 1
fi

# Vérifier que Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose pour continuer."
    exit 1
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
docker-compose down

# Construire et démarrer les services
echo "🔨 Construction et démarrage des services..."
docker-compose up --build -d

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier l'état des services
echo ""
echo "📊 État des services :"
docker-compose ps

echo ""
echo "✅ Architecture microservices démarrée avec succès !"
echo ""
echo "🌐 Accès aux services :"
echo "   - Application Frontend : http://localhost"
echo "   - API Documentation   : http://localhost/api/docs"
echo "   - Base de données     : localhost:5432"
echo ""
echo "📝 Commandes utiles :"
echo "   - Voir les logs       : docker-compose logs -f"
echo "   - Arrêter les services: docker-compose down"
echo "   - Redémarrer          : docker-compose restart"
echo ""
echo "🔍 Services internes (non exposés) :"
echo "   - Service SALARIE gRPC: salarie-service:50051"
echo ""