import joi from "joi";

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    userName: joi.string().min(4).required(),
    picture: joi.string().regex(/(https:\/\/|http:\/\/)([^\s(["<,>]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/).required()
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
});