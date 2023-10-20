# Projet O'To

L'objectif va être de mettre en place un serveur HTTP avec express puis de créer 2 routes dynamiques : une qui affiche la liste des agences et une pour le détail d'une agence

## 1. Configuration du serveur

Au minimum (à compléter) :

- Initialiser un package.json et installer ce dont on va avoir besoin, au moins : express, ejs, dotenv, pg
- Créer l'index.js et y mettre en place le serveur
- Mettre en place un routeur

## 2. Première route

En respectant l'architecture MVC, prévoir un contrôleur pour les actions des routes. 

- Préparer une route `/` qui présente dans une vue minimaliste (une liste basique) la liste des adresses agences
  - Mettre en place le module de connexion à la bdd (database.js)
  - Récupérer les agences via une requête à la bdd pour les présenter

## 3. Deuxième route

Même pour une deuxième route `/agence/:id`

Au clic sur l'adresse d'une agence on veut atterir sur une page de détail qui donne toutes les infos de l'agence.
