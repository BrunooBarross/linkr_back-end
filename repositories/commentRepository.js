import connection from '../db.js'

async function postComment(userId, postId, comment){
    return connection.query(`
        INSERT INTO comments ("senderUserId", "postId", comment)
        VALUES ($1, $2, $3)
    `, [userId, postId, comment])
}

const commentRepository = {
    postComment
}

export default commentRepository;