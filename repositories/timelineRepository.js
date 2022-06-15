const LIMIT_POSTS = 20;

import connection from "../db.js";


async function getTimeline() {

    return connection.query(`
        SELECT u."userName", u.picture, p.*, COALESCE(COUNT(l."postId"),0) AS likes
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        JOIN users u ON u.id = p."userId"
        GROUP BY (p.id, u.id)
        ORDER BY p.id DESC`
    );
}

async function getAuthTimeLine(id){
    return connection.query(`
        SELECT p.*, COALESCE(COUNT(l."postId"),0) AS likes
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        WHERE l."userId" = $1
        GROUP BY p.id
        ORDER BY p.id DESC;`, [id]);
}

const postsTimeline = {
    getTimeline,
    getAuthTimeLine
}

export default postsTimeline;