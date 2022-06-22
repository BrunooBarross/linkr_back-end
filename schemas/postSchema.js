import joi from "joi";

export const bodyPostSchema = joi.object({
    link: joi.string().uri().required(),
    text: joi.optional()
});

export const validateDateSchema = joi.object({
    createdAt: joi.date().required()
});