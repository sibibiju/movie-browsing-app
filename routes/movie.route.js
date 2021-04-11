const express = require('express');
const router = express.Router();
const movieValidator = require('../validations/movie.validation');
const movieController = require('../controllers/movie.controller');
const validator = require('../validations/validator');

router.get('/:id', movieController.getMovieById);
router.post('/search', movieValidator.searchRules(), validator, movieController.getMovie);

module.exports = router;