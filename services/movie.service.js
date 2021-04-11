const Movie = require('../models/movie.model');
const imdbConfig = require('../config/imdb');

const findMovie = async(imdbMovieId) => {
    let movie = await Movie.findOne({
        imdbMovieId: imdbMovieId
    });

    return movie;
}

const addMovie = async(movie) => {
    let posterPath = movie.poster_path;
    movie.poster = imdbConfig.imageBaseUrl + posterPath;
    movie.imdbMovieId = movie.imdb_id;

    let data = await Movie.create(movie);
    return data;
}

module.exports = {
    findMovie,
    addMovie
}