npm# SoPra FS22 - Client Template

## Getting started

Read and go through these Tutorials. It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.

# Launch & Deployment
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

The application will now listen on [http://localhost:3000](http://localhost:3000).

This is the client application. It will run without the server, but functionality is minimal. For all functions, the client expects the [server](https://github.com/sopra-fs22-group-13/braendi-dog-server) to listen on [http://localhost:8080](http://localhost:8080).

## Build
`npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations
The user starts on the login page where they either log in to an existing account or register a new one. After that they get redirected to the menu page. <br>
<p align="center">
    <img src="public/resources/illustrations/menu-page.png" width="50%"/>
</p>
From the menu page the user starts a new game by clicking on "Create Game" to get to the lobby page.<br>
From the lobby page the user invites 3 other users over the searchbar component to join their lobby.
<br>
<p align="center">
    <img src="public/resources/illustrations/lobby.png" width="50%"/>
</p>
Once the lobby is full, the lobby owner can start the game and everyone gets redirected to the game page.<br>
<p align="center">
    <img src="public/resources/illustrations/game.png" width="50%"/>
</p>
The game page is the main page of our web application. After the game of dog is completed, every user gets redirected to the menu page again. <br>
Alternatively to starting a game, the user could also view or edit their profile. <br>
<p align="center">
    <img src="public/resources/illustrations/user-flowchart.svg" width="50%"/>
</p>
