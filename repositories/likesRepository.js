import connection from "../db.js";

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

const likesRepository = {
    verifyLikes,
    postLike,
    deleteLike
}

export default likesRepository;