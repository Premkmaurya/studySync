const {body,validationResult} = require("express-validator")


async function validateMiddleware(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(res.status(400).json({errors:errors.array()}))
    }
    next()
}

const groupCreateValidation = [
    body('name')
    .notEmpty()
    .withMessage('Group name is required')
    .isLength({min:3})
    .withMessage('Group name must be at least 3 characters long'),
    body('description')
    .notEmpty()
    .withMessage('Group description is required')
    .isLength({min:5})
    .withMessage('Group description must be at least 5 characters long'),
    validateMiddleware
]

module.exports = {
    groupCreateValidation
}