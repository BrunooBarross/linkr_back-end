import { signInSchema } from "../schemas/userSchema.js";

export async function checkSignIn(req, res, next) {
    const values = req.body;

    const { error } = signInSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}