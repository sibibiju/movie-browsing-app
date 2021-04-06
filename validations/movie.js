const { body, validationResult } = require('express-validator');

const searchRules = () => {
    return [
        body('movieSearch').notEmpty().isString().isLength({ min: 2 }),
        body('category').notEmpty().isIn(["movie", "person"])
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))

    return res.status(422).json({
        errors: extractedErrors,
    });
}


module.exports = {
    searchRules,
    validate
}