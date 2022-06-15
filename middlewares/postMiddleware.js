import { bodyPostSchema } from "../schemas/postSchema.js";

export async function verifyPost(req, res, next) {
    const values = req.body;

    const { error } = bodyPostSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}