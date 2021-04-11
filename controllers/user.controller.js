const axios = require('axios');
const User = require('../models/user.model');
const imdbConfig = require('../config/imdb');
const movieService = require('../services/movie.service');
const catchAsync = require('../utils/catchAsync');

let createdAt = Date.now();
let updatedAt = Date.now();

const getUser = (req, res, next) => {
    if (req.user !== undefined && req.user.username !== undefined) {
        let username = req.user.username;

        User.findOne({
                username: username
            })
            .then(user => {
                if (user !== null && user.username !== undefined) {
                    res.status(200).json(user)
                } else {
                    User.create({
                            displayName: req.user.displayName,
                            username: req.user.username,
                            createdAt: createdAt,
                            updatedAt: updatedAt,
                            watchList: []
                        })
                        .then(savedUser => {
                            res.status(200).json(savedUser)
                        });
                }
            })
            .catch(e => next(e));
    } else {
        throw new Error("Invalid parameters provided for createUser");
    }
}

const addToWatchList = catchAsync(async(req, res, next) => {
    let imdbMovieId = req.body.imdbMovieId;
    let url = imdbConfig.apiBaseUrl + "/movie/" + imdbMovieId + "?api_key=" + process.env.IBM_API_KEY + "&external_source=imdb_id";

    let data = await axios.get(url);

    if (data !== null && data.data !== undefined) {
        let movieData = data.data;
        let movie = await movieService.findMovie(movieData.imdb_id);

        if (movie === null || movie.imdbMovieId === undefined) {
            movie = await movieService.addMovie(movieData);
        }

        res.send("OK");
    } else {
        res.status(404).json({ "error": "Invalid movie ID" });
    }
});

module.exports = {
    getUser,
    addToWatchList
}