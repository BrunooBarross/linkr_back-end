import bcrypt from 'bcrypt';
import connection from '../db.js'
import dayjs from 'dayjs';

async function getUserByEmail(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
}

async function createUser(email,  password, userName, picture) {
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    const passwordHash = bcrypt.hashSync(password, 10);
    return connection.query(`
    INSERT INTO users (email, password, "userName", picture, "createdAt") 
    VALUES ($1, $2, $3, $4, $5)`,[email, passwordHash, userName, picture, date]);
}

const usersRepository = {
    createUser,
    getUserByEmail
};

export default usersRepository;
