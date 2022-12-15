import Joi from "joi";

export const signInModel = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

export const signUpModel = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password'))
        .required()
        .messages({ 'any.only': '{{#label}} does not match' })
});