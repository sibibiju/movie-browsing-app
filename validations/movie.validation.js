const { body } = require('express-validator');

const searchRules = () => {
    return [
        body('movieSearch').notEmpty().isString().isLength({ min: 2 }),
        body('category').notEmpty().isIn(["movie", "person"])
    ];
}

module.exports = {
    searchRules
}