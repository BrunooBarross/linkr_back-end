import joi from "joi";

export const bodyCommentSchema = joi.object({
    postId: joi.number().required(),
    comment: joi.string().required()
});