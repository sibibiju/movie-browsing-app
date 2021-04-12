const request = require('request');
const imdbConfig = require('../config/imdb');
const config = require('../config/config');

module.exports = {
    getNowPlayingMovies: (req, res, next) => {
        request.get(imdbConfig.nowPlayingUrl, (error, response, movieData) => {
            if (error) {
                //passing it to express error handler middleware
                next(error);
            }

            let isLoggedIn = false;
            if (req.user !== undefined && req.user !== null) {
                isLoggedIn = true;
            }

            let data = JSON.parse(movieData);
            //res.status(200).json({ error: false, data: JSON.parse(movieData) });
            res.render('index', { movies: data.results, endpoint: config.endpoint })
        });
    },

    getMovieById: (req, res, next) => {
        // params get value from url eg - /movie/:id
        // query is used for query param
        const id = req.params.id;
        const url = imdbConfig.apiBaseUrl + "/movie/" + id + "?api_key=" + imdbConfig.apiKey;
        request.get(url, (error, response, movieData) => {
            if (error) {
                next(error);
            }

            let data = JSON.parse(movieData);
            //res.status(200).json({ error: false, data: JSON.parse(movieData) });
            res.render('singleMovie', { data })
        });
    },

    getMovie: (req, res, next) => {
        //body is used since the method is POST
        const search = encodeURI(req.body.movieSearch);
        const category = req.body.category;
        const movieUrl = `${imdbConfig.apiBaseUrl}/search/${category}?query=${search}&api_key=${imdbConfig.apiKey}`;

        request.get(movieUrl, (error, response, movieData) => {
            if (error) {
                next(error);
            }

            let data = JSON.parse(movieData);

            if (data.results && data.results.length == 0) {
                res.status(404).json({ error: true, message: "Not found" })
            }

            if (category == "person") {
                data.results = data.results[0].known_for;
            }
            //res.status(200).json({ error: false, data: JSON.parse(movieData) });
            res.render('index', { movies: data.results })
        });
    }
}