import connection from '../db.js'
import dayjs from 'dayjs';

async function postComment(userId, postId, comment){
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    return connection.query(`
        INSERT INTO comments ("senderUserId", "postId", comment, "createdAt" )
        VALUES ($1, $2, $3, $4)
    `, [userId, postId, comment, date])
}

async function selectComments(userIdToken, postId){
    return connection.query(`
        SELECT c."postId", c.comment, u.id as "idAuthor", u."userName" as "nameAuthor", u.picture, CASE WHEN f.id IS NULL THEN false ELSE true END as "iFollow"
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