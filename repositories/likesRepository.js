import connection from "../db.js";

async function verifyLikes(postId, userId){
    return connection.query(`
        SELECT  * FROM likes WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
}

async function postLike(postId, userId){
    return connection.query(`
        INSERT INTO likes ("userId", "postId") VALUES ($1 , $2)
    `, [userId, postId]);
}

async function deleteLike(postId, userId){
    return connection.query(`
        DELETE FROM likes WHERE id = $1 AND "userId" = $2
    `, [postId, userId]);
}

const likesRepository = {
    verifyLikes,
    postLike,
    deleteLike
}

export default likesRepository;