import joi from "joi";

export const bodyPostSchema = joi.object({
    link: joi.string().uri().required(),
    text: joi.string().required()
});