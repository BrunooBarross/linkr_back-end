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

export async function getUsersPosts(req, res) {
  const userId = req.params.id;
  const { id } = res.locals.userId;

  try {
    const posts = await usersRepository.getPostsUsers(userId);
    const postsLikes = await usersRepository.getPostsLikes(userId, id);
    const userData = await usersRepository.getUser(userId);
    for (let i = 0; i < posts.rows.length; i++) {
      posts.rows[i] = { ...posts.rows[i], liked: false }
    }
    for (let i = 0; i < posts.rows.length; i++) {
      for (let j = 0; j < postsLikes.rows.length; j++) {
        if (posts.rows[i].id === postsLikes.rows[j].id) {
          posts.rows[i] = { ...posts.rows[i], liked: true }
        }
      }
    }
    const result = { ...userData.rows[0], posts: [...posts.rows] };
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUsersByUsername(req, res) {
  const { username } = req.body
  try {
    const users = await usersRepository.getUsersByUsername(username);
    console.log(users.rows)
    res.send(users.rows)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}