import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import usersRepository from '../repositories/usersRepository.js';
import sessionRepository from '../repositories/sessionsRepository.js';


export async function login(req, res) {
  const { email, password } = req.body;
  const users = await usersRepository.getUserByEmail(email);

  if (users.rowCount === 0) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, users.rows[0].password)) {
    const data = { userId: users.rows[0].id };
    const config = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign(data, process.env.JWT_SECRET, config);
    await sessionRepository.createSession(users.rows[0].id);
    return res.status(200).send({ token: token, userName: users.rows[0].userName, picture: users.rows[0].picture });
  }

  res.sendStatus(401);
}