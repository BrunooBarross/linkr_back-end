import { signInSchema } from "../schemas/userSchema.js";
import usersRepository from '../repositories/usersRepository.js';
import jwt from "jsonwebtoken";

export async function checkSignIn(req, res, next) {
    const values = req.body;

    const { error } = signInSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}

export async function validateToken(req, res, next) {
  console.log("Entrou");
  console.log(req.headers);
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).send("No token."); // unauthorized
  }
  const chaveSecreta = process.env.JWT_SECRET;

  try {
    const dados = jwt.verify(token, chaveSecreta);
    const user = await usersRepository.getUserById(dados.sessionId);

    if (user.rowCount === 0) {
      return res.status(401).send("Session not found."); // unauthorized
    }
    res.locals.userId = user.rows[0];
    console.log("Validou");
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401); // server error
  }
}