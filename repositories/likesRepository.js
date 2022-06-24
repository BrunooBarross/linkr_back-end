import connection from "../db.js";
import dayjs from 'dayjs';

async function verifyLikes(postId, userId){
    return connection.query(`
        SELECT  * FROM likes WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function postLike(postId, userId){
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    return connection.query(`
        INSERT INTO likes ("userId", "postId", "createdAt") VALUES ($1 , $2, $3)
    `, [userId, postId, date]);
}

async function deleteLike(postId, userId){
    return connection.query(`
        DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2
    `, [postId, userId]);
}

async function selectLikesNames(postId){
    return connection.query(`
        SELECT l."userId", u."userName"
        FROM likes l
        JOIN users u ON u.id = l."userId" AND l."postId" = $1
        ORDER BY l.id
    `, [postId]);
}

const likesRepository = {
    verifyLikes,
    postLike,
    deleteLike,
    selectLikesNames
}

export default likesRepository;