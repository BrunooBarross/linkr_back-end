import connection from '../db.js'
import dayjs from 'dayjs';

async function createSession(userId) {
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    return connection.query(`
     INSERT INTO sessions ("userId", "createdAt") VALUES ($1, $2)`, [userId, date]);
}

const sessionRepository = {
    createSession
}

export default sessionRepository;