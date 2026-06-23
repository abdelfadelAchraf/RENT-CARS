![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

<!--# RENT-CARS – Application de location de voitures-->
# <img src="frontend/src/assets/logo.png" alt="RENT-CARS Logo" height="32"/> RENT-CARS – Application de location de voitures

**RENT-CARS** est une application web fullstack de location de voitures entre particuliers, développée avec les technologies modernes du web : React, TypeScript, Node.js, Express et MongoDB.

Ce projet a été réalisé dans le cadre du module *Technologie Web*, par un groupe de trois étudiants, avec une approche agile et une architecture MVC bien structurée.

<!-- **vous trouvez lien en haut dans description** :
> 🔗 [Lien de la démo](https://rent-cars-omega.vercel.app/) -->

## Fonctionnalités principales

* **Utilisateurs**
  - Inscription avec vérification par email
  - Connexion / Déconnexion
  - Modification du profil et de l'image de profil
  - Réinitialisation de mot de passe
  - Réservation de véhicules

* **Propriétaires (Renters)**
  - Ajout de véhicules avec images
  - Modification et suppression de véhicules
  - Gestion des disponibilités
  - Suivi des réservations liées à leurs véhicules

* **Authentification & Sécurité**
  - Authentification JWT
  - Middleware de protection d'API
  - Rôles (user / renter / admin)

## <img src="frontend/src/assets/phone.png" alt="phone" height="32"/> Aperçu

![rental_car](frontend/src/assets/rental_car.png)
![rental_car2](frontend/src/assets/rental_car2.png)
![rental_car3](frontend/src/assets/rental_car3.png)

## Technologies utilisées

| Frontend              | Backend                   | Autres services              |
|-----------------------|---------------------------|------------------------------|
| React + TypeScript    | Node.js + Express         | MongoDB Atlas (database)     |
| TailwindCSS           | REST API                  | Cloudinary (upload d'images) |
| React Router DOM      | JWT Authentication        | Nodemailer (emailing)        |
| Axios                 | Mongoose ODM              |                              |
| Vite                  |                           |                              |

## Structure du projet

```
RENT-CARS/
├── frontend/ # Interface utilisateur (React)
├── backend/ # Serveur API REST (Node.js + Express)
```

## Déploiement

<!-- > 🔗 [Lien de la démo](https://rent-cars-omega.vercel.app/) -->
- **Frontend**
- **Backend**
- **Base de données** hébergée sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation locale

- 1. Repo

```bash
git clone https://github.com/abdelfadelAchraf/RENT-CARS.git
cd RENT-CARS
```

- 2. Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

- 3. Frontend

```bash
cd frontend
npm install
npm run dev              # http://localhost:5173
```

## Variables d'environnement .env

**Backend:**
```
PORT=5000
MONGODB_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=...
EMAIL_PASSWORD=...
```

## Tests

- Tests manuels réalisés sur les principales fonctionnalités : 
  - Authentification
  - Création / modification de voiture
  - Réservation
- Intégration des API testées via Postman

## Evolutions

- Application mobile React Native
- Système de notation & avis
- Google Maps pour la localisation des voitures
- Programme de fidélité
- Chat intégré avec le support
- Suggestions personnalisées par IA

## Groupe

> Achraf Abdelfadel [github.com/abdelfadelAchraf](https://github.com/abdelfadelAchraf)
---
> Zakaria Ennaqui [github.com/zakariaennaqui](https://github.com/zakariaennaqui)
---
> Imane Abasalah [github.com/amyaby](https://github.com/amyaby)
