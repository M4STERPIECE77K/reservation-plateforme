# Reservation Management

Ce projet contient un frontend Angular et un backend Spring Boot.

## Lancement rapide

Pour lancer le frontend et le backend en même temps avec une seule commande :

```bash
npm start
```

Cette commande utilise `concurrently` pour exécuter :
1. Le frontend (Angular) sur [http://localhost:4200](http://localhost:4200)
2. Le backend (Spring Boot) sur [http://localhost:8089](http://localhost:8089) (ou le port configuré)

### Autres commandes utiles

- **Démarrer uniquement le frontend :** `npm run start:frontend`
- **Démarrer uniquement le backend :** `npm run start:backend`
- **Démarrer la base de données (Docker) :** `npm run docker:up`
- **Arrêter la base de données :** `npm run docker:down`

## Prérequis

- Node.js et npm
- Java 21
- Docker (pour la base de données)
