const express = require('express');
const router = express.Router();
const userRoute = require("./user.route");
const movieRoute = require("./movie.route");
const movieController = require('../controllers/movie.controller');

const defaultRoutes = [{
        path: "/user",
        route: userRoute
    },
    {
        path: "/movie",
        route: movieRoute
    }
];

//added it in locals so that it can be accessed by all routes
router.use((req, res, next) => {
    res.locals.imageBaseUrl = process.env.IBM_IMAGE_BASE_URL;
    //res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    next();
});

router.get('/', movieController.getNowPlayingMovies);

for (route of defaultRoutes) {
    router.use(route.path, route.route);
}

module.exports = router;