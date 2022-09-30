# P13

![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)

## Description :

> Écrivez des appels à l'API REST pour connecter le front au back et modélisez une API.
> #### Compétences évaluées
>
> -   Implémenter un gestionnaire d'état dans une application React
> -   Interagir avec une API
> -   Modéliser une API
> -   S'authentifier à une API
>
### Situation (fictive) du projet :

Développeur Front-end dans une agence spécialisée dans le développement d’applications web.
L’agence à un nouveau projet avec une nouvelle banque qui a besoin d'aide pour mettre en place son application. Le projet se décompose en deux phases :

- Phase 1 : Authentification des utilisateurs - Création d'une application web permettant aux clients de se connecter et de gérer leurs comptes et leur profil.
- Phase 2 : Transactions - Spécifier les endpoints d’API nécessaires pour une deuxième mission.

Mon rôle lors de la phase 1 a été de développer l’application web avec authentification des utilisateurs à l’aide de React et Redux. Concernant la phase 2, mon rôle a été de proposer un modèle pour la conception de l’API des transactions avec Swagger.

### Phase 1 : Contraintes techniques :

- Créer l’application web (responsive) avec React.
    - Comme point de départ, le HTML statique et le CSS est fourni pour la page d'accueil, la page de connexion et la page de profil.

- Utiliser Redux pour gérer le state de l'application, notamment l’application doit avoir :
    - Un store pour gérer les données
    - Des actions pour l’envoi des informations
    - Des reducers pour gérer les changements d'état de l'application
### Phase 1 : Contraintes fonctionnelles :

- L'utilisateur peut visiter la page d'accueil
- L'utilisateur peut se connecter au système
    - Accédez à la page de connexion (/login)
    - Remplir le formulaire de connexion avec ses identifiants
    - Se connecter à l’application en utilisant des jetons JWT pour l'authentification
    - Naviguer avec succès vers la page de profil (/profile)
- L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès
    - Accédez à la page de profil (/profile)
    - Voir leur prénom sur la page de profil
    - Voir les informations de compte bancaire
- L'utilisateur peut modifier le profil (nom et prénom) et conserver les données dans la base de données.
- L'utilisateur peut se déconnecter du système
    - Voir le bouton de déconnexion une fois connecté
    - Cliquez sur le bouton de déconnexion, déconnecte l’utilisateur et celui-ci revient à la page d'accueil (/)


### Phase 2 :


## Installation
Clone the repository :
- `git clone https://github.com/ArthurBlanc/ArthurBlanc_13_30052022`
### Prérequis

- [Git](https://git-scm.com)
- [Node](https://nodejs.org/en/) for npm commands or [Yarn](https://yarnpkg.com/) for yarn commands

### Installation et lancement du Back-end

1. Allez dans le dossier "Back-end" :

2. Installer toutes les dépendances pour le Back-end :
- `npm install` ou `yarn`

3. Lancer le back-end sur le port 3001 (port par défaut) :
- `npm run dev` ou `yarn run dev`

### Installation et lancement du Front-end

1. Allez dans le dossier "Front-end" :

2. Installer toutes les dépendances pour Front-end :
- `npm install` ou `yarn`

3. Lancer le Front-end sur le port 3000 (port par défaut) :
- `npm start` ou `yarn start`

## Développé avec

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte et son intégration de GitHub
-   [React 18](https://fr.reactjs.org/) - Bibliothèque JavaScript libre développée par Facebook depuis 2013
-   [Create React App](https://create-react-app.dev/) - Boîte à outils créée par Facebook, qui est la référence pour initier un projet React
-   [React Router V6](https://reactrouter.com/) - Bibliothèque de routage pour React
-   [Sass](https://sass-lang.com/) - Langage de script préprocesseur qui est compilé ou interprété en CSS
-   [Prop-types](https://www.npmjs.com/package/prop-types) - Vérification du type pour les props React
-   [GitHub](https://github.com/) - Outil de gestion de versions

## Auteur

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/)