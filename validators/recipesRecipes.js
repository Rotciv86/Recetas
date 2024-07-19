const { check, validationResult } = require('express-validator')

const validatorCreateRecipe = [
    check("name").exists().notEmpty().isLength({min: 3, max: 40})

,
(request, response, next) => {
    try {
        validationResult(request).throw()
        return next()

    } catch (error) {
        response.status(403).send({errors: error.array()})
    }
}
]

module.exports = { validatorCreateRecipe }