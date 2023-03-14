![ArgentBank](/Front-end/src/assets/argentBankLogo.png)

# ArgentBank 🏦💵

![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/ArthurBlanc)
[![React](https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logocolor=61dafb)](https://reactjs.org/)

<a href="#description-fr-">README en Français</a> - <a href="#en-description">English README</a>

## Description FR :

Ceci est un projet réalisé dans le cadre du programme de formation Développeur Front-end JavaScript React chez [OpenClassrooms](https://openclassrooms.com/fr/paths/516-developpeur-dapplication-javascript-react)

> Écrivez des appels à l'API REST pour connecter le front au back et modélisez une API.
>
> #### Compétences évaluées :
>
> -   Implémenter un gestionnaire d'état dans une application React 🔄
> -   Interagir avec une API 🤝
> -   Modéliser une API 📝
> -   S'authentifier à une API 🔑

### Situation (fictive) du projet :

Développeur Front-end dans une agence spécialisée dans le développement d’applications web.
L’agence à un nouveau projet avec une nouvelle banque qui a besoin d'aide pour mettre en place son application. Le projet se décompose en deux phases :

-   Phase 1 : Authentification des utilisateurs - Création d'une application web permettant aux clients de se connecter et de gérer leurs comptes et leur profil.
-   Phase 2 : Transactions - Spécifier les endpoints d’API nécessaires pour une deuxième mission.

Mon rôle lors de la phase 1 a été de développer l’application web avec authentification des utilisateurs à l’aide de React et Redux. Concernant la phase 2, mon rôle a été de proposer un [modèle pour la conception de l’API des transactions](/Front-end/swagger_phase_2.yaml) à ouvrir avec Swagger.

### Phase 1 : Contraintes techniques :

-   Créer l’application web (responsive) avec React.

    -   Comme point de départ, le HTML statique et le CSS est fourni pour la page d'accueil, la page de connexion et la page de profil.

-   Utiliser Redux pour gérer le state de l'application, notamment l’application doit avoir :
    -   Un store pour gérer les données
    -   Des actions pour l’envoi des informations
    -   Des reducers pour gérer les changements d'état de l'application

### Phase 1 : Contraintes fonctionnelles :

-   L'utilisateur peut visiter la page d'accueil
-   L'utilisateur peut se connecter au système
    -   Accédez à la page de connexion (/login)
    -   Remplir le formulaire de connexion avec ses identifiants
    -   Se connecter à l’application en utilisant des jetons JWT pour l'authentification
    -   Naviguer avec succès vers la page de profil (/profile)
-   L'utilisateur ne peut voir les informations relatives à son propre profil qu'après s'être connecté avec succès
    -   Accédez à la page de profil (/profile)
    -   Voir leur prénom sur la page de profil
    -   Voir les informations de compte bancaire
-   L'utilisateur peut modifier le profil (nom et prénom) et conserver les données dans la base de données.
-   L'utilisateur peut se déconnecter du système
    -   Voir le bouton de déconnexion une fois connecté
    -   Cliquez sur le bouton de déconnexion, déconnecte l’utilisateur et celui-ci revient à la page d'accueil (/)

## Installation :

### Procédure d'installation :

Cloner le repository:

-   `https://github.com/ArthurBlanc/ArgentBank`

### Installation et lancement du Back-end :

1. Allez dans le dossier "Back-end" :

2. Installer toutes les dépendances pour le Back-end :

-   `npm install` ou `yarn`

3. Lancer le back-end sur le port 3001 (port par défaut) :

-   `npm run dev` ou `yarn run dev`

### Installation et lancement du Front-end :

1. Allez dans le dossier "Front-end" :

2. Installer toutes les dépendances pour Front-end :

-   `npm install` ou `yarn`

3. Lancer le Front-end sur le port 3000 (port par défaut) :

-   `npm start` ou `yarn start`

## Développé avec :

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte
-   [Sass](https://sass-lang.com/) - Préprocesseur CSS
-   [React 18](https://fr.reactjs.org/) - Bibliothèque JavaScript libre développée par Facebook
-   [Create React App](https://create-react-app.dev/) - Boîte à outils créée par Facebook, qui est la référence pour initier un projet React
-   [React Router V6](https://reactrouter.com/) - Bibliothèque de routage pour React
-   [Prop-types](https://www.npmjs.com/package/prop-types) - Un package utilisé pour documenter les types de propriétés prévus transmises aux composants React
-   [Redux](https://redux.js.org/) - Bibliothèque JS de gestion d'état pour applications web
-   [JSDoc](https://jsdoc.app/) - Générateur de documentation pour JavaScript
-   [GitHub](https://github.com/) - Outil de gestion de versions

## Auteur :

**Arthur Blanc** : [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)

---

## EN Description:

This is a project carried out as part of the Front-End JavaScript React Developer training program at [OpenClassrooms](https://openclassrooms.com/en/paths/517-javascript-react-developer).

> Write REST API calls to connect the front-end to the back-end and model an API.
>
> #### Skills evaluated:
>
> -   Implement a state manager in a React application 🔄
> -   Interact with an API 🤝
> -   Model an API 📝
> -   Authenticate with an API 🔑

### Project (fictional) situation:

I am a Front-end Developer in an agency specialized in web application development.
The agency has a new project with a new bank that needs help setting up its application. The project is divided into two phases:

-   Phase 1: User Authentication - Creating a web application that allows clients to log in and manage their accounts and profile.
-   Phase 2: Transactions - Specifying the necessary API endpoints for a second mission.

My role during phase 1 was to develop the web application with user authentication using React and Redux. Regarding phase 2, my role was to propose a [model for designing the transaction API](/Front-end/swagger_phase_2.yaml) to be opened with Swagger.

### Phase 1: Technical Constraints:

-   Create the web application (responsive) with React.

    -   As a starting point, static HTML and CSS is provided for the homepage, login page, and profile page.

-   Use Redux to manage the application state, including the application must have:
    -   A store to manage data
    -   Actions to send information
    -   Reducers to manage changes in the application state

### Phase 1: Functional Constraints:

-   The user can visit the homepage.
-   The user can log in to the system.
    -   Access the login page (/login)
    -   Fill in the login form with their credentials
    -   Log in to the application using JWT tokens for authentication
    -   Successfully navigate to the profile page (/profile)
-   The user can only see information related to their own profile after successfully logging in.
    -   Access the profile page (/profile)
    -   See their first name on the profile page
    -   See banking account information
-   The user can edit the profile (first and last name) and retain the data in the database.
-   The user can log out of the system.
    -   See the logout button once logged in
    -   Clicking the logout button logs the user out and returns them to the homepage (/)

### Installation process:

Clone the repository :

-   `git clone https://github.com/ArthurBlanc/ArgentBank`

### Installing and launching Back-end:

1. Go in "Back-end" folder :

2. Install all dependencies for Back-end:

-   `npm install` or `yarn`

3. Launch back-end on port 3001 (default port):

-   `npm run dev` or `yarn run dev`

### Installing and launching Front-end:

1. Go in "Front-end" folder :

2. Install all dependencies for Front-end:

-   `npm install` or `yarn`

3. Launch front-end on port 3000 (default port):

-   `npm start` or `yarn start`

## Built With:

-   [Visual Studio Code](https://code.visualstudio.com/) - Text editor
-   [Sass](https://sass-lang.com/) - CSS preprocessor
-   [React 18](https://reactjs.org/) - Free and open-source JavaScript library developed by Facebook
-   [Create React App](https://create-react-app.dev/) - Toolkit created by Facebook, which is the reference for initiating a React project
-   [React Router V6](https://reactrouter.com/) - Routing library for React
-   [Prop-types](https://www.npmjs.com/package/prop-types) - A package used to document the intended types of properties passed to React components
-   [Redux](https://redux.js.org/) - JS library for state management in web applications
-   [JSDoc](https://jsdoc.app/) - Documentation generator for JavaScript
-   [GitHub](https://github.com/) - Version control tool

## Author:

**Arthur Blanc**: [**GitHub**](https://github.com/ArthurBlanc/) - [**Portfolio**](https://abcoding.fr/portfolio)
