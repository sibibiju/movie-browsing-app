## Overview
This application is used for creating watchlists & browsing through movies. The application is built using EJS and Node.js (using Express) for the backend.

The app uses TMDB API to load the movies. More details about the API can be found [here](https://developers.themoviedb.org/3/getting-started/introduction)

## Home screen
The home page shows the latest movies playing in the theatres.
![home_screen](public/images/home.png?raw=true)

## Movie detail screen
This page opens up when the user clicks on any movie from the home page or from the search result. It shows the basic details related to the movie like tagline, Synopsis, IMDB rating, etc
![movie_detail_screen](public/images/movie-info.png?raw=true)

## Watchlist screen
This page shows the basic user profile & the movies added to the watchlist. The user must be logged in to add movies to the watchlist.
![movie_detail_screen](public/images/profile.png?raw=true)


## Application Details
- The app is built using Node.js & Express Framework.
- Mongoose is used to connect to the database.
- The application supports Github Oauth login.
- User details & the movies added to the user's watchlist are stored in the MongoDB database.
- API routes are defined for browsing the movies, searching & getting details of a particular movie. TMDB APIs are used for this purpose.

## Getting Started

Clone the repo -
```
git clone https://github.com/sibibiju/movie-search-app.git
cd movie-search-app
```

Install node modules - 
```
npm install
```

Create .env file & values - 
```
cp .env.example .env
```

Start the server - 
```
nodemon
```

Open in browser - 
http://127.0.0.1:3000

## Features to be addeed/updated in future - 
- Logging functionality
- UI
- Add 404 error page
- Remove movies from the watchlist
- Add caching mechanism using Redis

