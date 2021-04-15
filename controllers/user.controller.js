const axios = require('axios');
const User = require('../models/user.model');
const imdbConfig = require('../config/imdb');
const movieService = require('../services/movie.service');
const catchAsync = require('../utils/catchAsync');

let createdAt = Date.now();
let updatedAt = Date.now();

const getUser = (req, res, next) => {
    let username = req.user.username;

    User.findOne({
            username: username
        })
        .populate("watchList")
        .exec()
        .then(user => {
            if (user !== null && user.username !== undefined) {
                res.render('profile', { user: user })
            } else {
                User.create({
                        displayName: req.user.displayName,
                        username: req.user.username,
                        createdAt: createdAt,
                        updatedAt: updatedAt,
                        watchList: []
                    })
                    .then(savedUser => {
                        res.render('profile', { user: savedUser })
                    });
            }
        })
        .catch(e => next(e));
}

const addToWatchList = catchAsync(async(req, res, next) => {
    let imdbMovieId = req.body.movie_id;

    let url = imdbConfig.apiBaseUrl + "/movie/" + imdbMovieId + "?api_key=" + imdbConfig.apiKey + "&external_source=imdb_id";
    let data = await axios.get(url);

    if (data !== null && data.data !== undefined) {
        let movieData = data.data;
        let movie = await movieService.findMovie(movieData.imdb_id);

        if (movie === null || movie.imdbMovieId === undefined) {
            movie = await movieService.addMovie(movieData);
        }

        let response = await User.updateOne({ username: req.user.username }, { $addToSet: { watchList: movie._id } })
        res.status(200).send("OK");
    } else {
        res.status(404).json({ "error": "Invalid movie ID" });
    }
});

module.exports = {
    getUser,
    addToWatchList
}