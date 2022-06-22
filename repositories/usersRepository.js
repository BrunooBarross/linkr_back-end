import bcrypt from 'bcrypt';
import connection from '../db.js'
import dayjs from 'dayjs';

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(email, password, userName, picture) {
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    const passwordHash = bcrypt.hashSync(password, 10);
    return connection.query(`
    INSERT INTO users (email, password, "userName", picture, "createdAt") 
    VALUES ($1, $2, $3, $4, $5)`, [email, passwordHash, userName, picture, date]);
}

async function getUserById(id) {
    return connection.query(`SELECT u.id FROM sessions s JOIN users u ON s."userId" = u.id WHERE s.id=$1`, [id]);
}

async function getUser(id) {
    return connection.query(`SELECT u.id, u."userName", u."picture" FROM users u WHERE u.id=$1`, [id]);
}

async function getPostsUsers(id) {
    return connection.query(`
        SELECT p.*, COALESCE(COUNT(l."postId"),0) AS likes
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        WHERE p."userId" = $1 
        GROUP BY p.id
        ORDER BY p.id DESC;`, [id]);
}

async function getPostsLikes(userId, userTokenId) {
    return connection.query(`
        SELECT p.*, COALESCE(COUNT(l."postId"),0) AS likes
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        WHERE p."userId" = $1 AND l."userId" = $2
        GROUP BY p.id
        ORDER BY p.id DESC;`, [userId, userTokenId]);
}

async function getUsersByUsername(username) {
    return connection.query(`
        SELECT * FROM users
        WHERE "userName" LIKE $1 LIMIT 3`, [`${username}%`]);
}

const usersRepository = {
    createUser,
    getUserByEmail,
    getUser,
    getUserById,
    getPostsUsers,
    getPostsLikes,
    getUsersByUsername
};

export default usersRepository;
