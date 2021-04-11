const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    imdbMovieId: {
        type: String,
        required: true
    },
    genres: [{
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('movie', movieSchema);