import usersRepository from '../repositories/usersRepository.js';

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await usersRepository.getUserByEmail(user.email)

    if (existingUsers.rowCount > 0) {
      return res.status(409).send("email já cadastrado");
    }

    const { email, userName, password, picture } = user;

    await usersRepository.createUser(email, password, userName, picture);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

