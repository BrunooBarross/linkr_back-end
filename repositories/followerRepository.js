import connection from '../db.js'
import dayjs from 'dayjs';

async function verifyFollower(followerId, followId){
    return connection.query(`
        SELECT * FROM followers f WHERE f."followerId" = $1 AND f."followId" = $2;
    `, [followerId, followId])
}

async function verifyAllFollowerUser(userTokenId){
    return connection.query(`
        SELECT * FROM followers f WHERE f."followerId" = $1;
    `, [userTokenId]);
}
async function createFollower(followerId, followId) {
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    return connection.query(`
        INSERT INTO followers ("followerId", "followId", "createdAt") VALUES ($1, $2, $3)`, [followerId, followId, date]);
}

async function deleteRelationFollower(followerId, followId) {
    return connection.query(`
        DELETE FROM followers f WHERE f."followerId" = $1 AND f."followId" = $2;`, [followerId, followId]);
}

const followerRepository = {
    createFollower,
    verifyFollower,
    deleteRelationFollower,
    verifyAllFollowerUser
}

export default followerRepository;