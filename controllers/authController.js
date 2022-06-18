import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import usersRepository from '../repositories/usersRepository.js';
import sessionRepository from '../repositories/sessionsRepository.js';


export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const users = await usersRepository.getUserByEmail(email);

    if (users.rowCount === 0) {
      return res.sendStatus(401);
    }

    if (bcrypt.compareSync(password, users.rows[0].password)) {
      const sessionId = await sessionRepository.createSession(users.rows[0].id);
      const data = { sessionId: sessionId.rows[0].id };
      const config = { expiresIn: 60 * 60 * 48 };
      const token = jwt.sign(data, process.env.JWT_SECRET, config);
      delete users.rows[0].createdAt;
      delete users.rows[0].email;
      delete users.rows[0].password;
      return res.status(200).send({ token: token, ...users.rows[0] });
    }
    res.sendStatus(401);

  } catch (error) {
      return res.sendStatus(500);
  }
}