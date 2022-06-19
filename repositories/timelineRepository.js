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
    return connection.query(`
        INSERT INTO posts ("userId", "link", "text", "title", "description", "image")
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING id
    `, [userId, metadata.url, text, metadata.title, metadata.description, metadata.image]);
}

async function selectUserIdPost(postId) {
    return connection.query(`SELECT posts.* FROM posts WHERE posts.id = $1`, [postId]);
}

async function deletePostIdHash(postId) {
    return connection.query(`DELETE FROM "hashtagRelation" WHERE "hashtagRelation"."postId" = $1`, [postId]);
}

async function deletePostIdLikes(postId) {
    return connection.query(`DELETE FROM likes WHERE likes."postId" = $1`, [postId]);
}

async function deletePostId(postId) {
    return connection.query(`DELETE FROM posts WHERE posts.id = $1`, [postId]);
}

async function updatePost(userId,postId, link, text) {
    const metadata = await urlMetadata(link);
    return connection.query(`
        UPDATE posts 
        SET "userId" = $1, 
            link = $2, 
            text = $3, 
            title = $4, 
            description = $5,
            image = $6
            WHERE posts.id = $7`
            ,[userId, metadata.url, text, metadata.title, metadata.description, metadata.image, postId]);
}
const postsTimeline = {
    getTimeline,
    getAuthTimeLine,
    postUrlTimeLine,
    selectUserIdPost,
    deletePostIdHash,
    deletePostIdLikes,
    deletePostId,
    updatePost
}

export default postsTimeline;