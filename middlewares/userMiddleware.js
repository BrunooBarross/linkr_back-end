import { signUpSchema } from "../schemas/userSchema.js";

export async function checkSignUp(req, res, next) {
    const values = req.body;

    const { error } = signUpSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}