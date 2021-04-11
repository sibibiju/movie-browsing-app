const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUser);
router.get('/login', passport.authenticate('github', { scope: ['profile'] }));

//This route is fired when we get code from github. The middleware passport.authenticate uses the code to fetch
//the user profile
router.get('/auth', passport.authenticate('github', { successRedirect: "/user", failureRedirect: "/user/failed" }));
router.get('/failed', (req, res, next) => {
    res.send("Failed to login");
});
router.put('/watchlist', userController.addToWatchList);

module.exports = router;