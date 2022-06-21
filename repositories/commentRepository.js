import connection from '../db.js'

async function postComment(userId, postId, comment){
    return connection.query(`
        INSERT INTO comments ("senderUserId", "postId", comment)
        VALUES ($1, $2, $3)
    `, [userId, postId, comment])
}

async function selectComments(userIdToken, postId){
    return connection.query(`
        SELECT c.*, u.id as "idAuthor", u."userName" as "commentAuthor", u.picture, CASE WHEN f.id IS NULL THEN false ELSE true END as "iFollow"
        FROM comments c
        JOIN users u ON u.id = c."senderUserId"
        LEFT JOIN followers f ON f."followerId" = $1 and f."followId" = c."senderUserId"
        WHERE c."postId" = $2
        ORDER BY c.id ASC
    `, [userIdToken, postId])
}

const commentRepository = {
    postComment,
    selectComments
}

export default commentRepository;