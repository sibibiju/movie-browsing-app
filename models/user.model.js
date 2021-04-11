const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    displayName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    watchList: [{
        type: Schema.Types.ObjectId,
        ref: "movie"
    }],
    createdAt: {
        type: Schema.Types.Date,
        required: true
    },
    updatedAt: {
        type: Schema.Types.Date,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);