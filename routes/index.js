const express = require('express');
const router = express.Router();
const passport = require('passport');
const movieValidator = require('../validations/movie');

const movieController = require('../controllers/movie');
const userController = require('../controllers/user');
//const { check, validationResult } = require('express-validator');

//added it in locals so that it can be accessed by all routes
router.use((req, res, next) => {
    res.locals.imageBaseUrl = process.env.IBM_IMAGE_BASE_URL;
    //res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    next();
});

router.get('/', movieController.getNowPlayingMovies);

router.get('/login', passport.authenticate('github', { scope: ['profile'] }));

//This route is fired when we get code from github. The middleware passport.authenticate uses the code to fetch
//the user profile
router.get('/auth', passport.authenticate('github', { successRedirect: "/user", failureRedirect: "/failed" }));

router.get('/user', userController.getUser);

router.get('/movie/:id', movieController.getMovieById);

router.post('/search', movieValidator.searchRules(), movieValidator.validate, movieController.getMovie);

router.get('/failed', (req, res, next) => {
    res.send("Failed to login");
});

// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'Movie App' });
// });


module.exports = router;