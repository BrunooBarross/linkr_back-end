const LIMIT_POSTS = 20;
import urlMetadata from "url-metadata";
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

async function postUrlTimeLine(userId, link, text) {
    const metadata = await urlMetadata(link);
    connection.query(`
        INSERT INTO posts ("userId", "link", "text", "title", "description", "image")
        VALUES ($1,$2,$3,$4,$5,$6)
    `, [userId, metadata.url, text, metadata.title, metadata.description, metadata.image]);
}

const postsTimeline = {
    getTimeline,
    getAuthTimeLine,
    postUrlTimeLine
}

export default postsTimeline;