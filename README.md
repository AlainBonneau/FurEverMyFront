# FurEverHome 🐾

Bienvenue sur **FurEverHome**, une application web conçue pour gérer un refuge pour animaux. Ce projet met en avant des fonctionnalités de gestion des animaux, des utilisateurs, et des tâches au sein d'une structure moderne et intuitive. L'objectif principal de **FurEverHome** est de simplifier la gestion quotidienne d'un refuge grâce à une interface ergonomique et des outils efficaces.

---

## 📂 Structure du projet

Le projet est divisé en deux principales parties : 

1. **Frontend** (interface utilisateur) :
   - Développé avec **React.js** et **Next.js** pour une expérience utilisateur dynamique et rapide.
   - Gestion de l'état centralisée avec **Redux Toolkit**.
   - Utilisation de **TypeScript** pour un code fiable et robuste.
   - Interface stylisée avec **SCSS** et composants modulaires.

2. **Backend** (API REST) :
   - Développé avec **Node.js** et **Express.js**.
   - Base de données relationnelle gérée avec **PostgreSQL** et **Sequelize** (ORM).
   - Authentification sécurisée avec **JWT** (JSON Web Tokens).
   - Validation des entrées utilisateur via **Joi**.
   - Sécurisation contre les attaques XSS avec **sanitize-html**.
   - lien du repo : https://github.com/AlainBonneau/FurEverMy

---

## ⚙️ Technologies utilisées

### Frontend
- **React.js** : Framework pour construire des interfaces utilisateur dynamiques.
- **Next.js** : Framework basé sur React pour le SSR (Server-Side Rendering) et le routage.
- **TypeScript** : Superset de JavaScript, ajoutant un typage statique.
- **Redux Toolkit** : Gestion de l'état global.
- **SCSS** : Pour des styles modulaires et maintenables.

### Backend
- **Node.js** : Runtime JavaScript côté serveur.
- **Express.js** : Framework pour créer des APIs REST.
- **Sequelize** : ORM pour simplifier la gestion des relations dans la base de données.
- **PostgreSQL** : Base de données relationnelle robuste.
- **JWT** : Sécurisation des sessions et authentification.
- **bcrypt** : Hachage sécurisé des mots de passe.

### Outils
- **Mocodo** : Utilisé pour concevoir le modèle relationnel de la base de données.
- **Axios** : Requêtes HTTP entre le frontend et le backend.

---

## 📑 Fonctionnalités principales

- **Gestion des animaux** :
  - Ajout, modification, visualisation et désactivation des fiches des animaux.
  - Association des animaux à une espèce et une race.

- **Gestion des utilisateurs** :
  - Gestion des employés et administrateurs du refuge.
  - Authentification et rôles (employé/admin).

- **Gestion des tâches** :
  - Assignation des tâches aux utilisateurs et aux animaux.
  - Suivi de l'état des tâches (en cours, terminées, etc.).

