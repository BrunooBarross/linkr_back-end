const LIMIT_POSTS = 20;
import urlMetadata from "url-metadata";
import connection from "../db.js";
import dayjs from 'dayjs';

async function getTimeline(userIdToken) {

    return connection.query(`
        SELECT u."userName", u.picture, p.*, COALESCE(COUNT(l."postId"),0) AS likes
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        JOIN users u ON u.id = p."userId"
        JOIN followers f ON f."followerId" = $1 AND f."followId" = u.id
        GROUP BY (p.id, u.id, f.id)
        ORDER BY p."createdAt" DESC
        LIMIT ${LIMIT_POSTS}`
    ,[userIdToken]);
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
    const date = dayjs().locale('pt-BR').format('YYYY-MM-DD HH:mm:ss');
    const metadata = await urlMetadata(link);
    if (metadata.image === "") {
        metadata.image = "https://archive.org/download/no-photo-available/no-photo-available.png"
    }
    return connection.query(`
        INSERT INTO posts ("userId", "link", "text", "title", "description", "image", "createdAt")
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id
    `, [userId, metadata.url, text, metadata.title, metadata.description, metadata.image,date]);
}

async function selectUserIdPost(postId) {
    return connection.query(`SELECT posts.* FROM posts WHERE posts.id = $1`, [postId]);
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

async function existingPost(postId){
    return connection.query(`
        SELECT * FROM posts WHERE id = $1
    `, [postId]);
}

async function getCountNewPosts(userIdToken, date){
    return connection.query(`
        SELECT COUNT (*) from (
            SELECT p.id
            FROM posts p
            JOIN users u ON u.id = p."userId"
            JOIN followers f ON f."followerId" = $1 AND f."followId" = u.id
            WHERE p."createdAt" > $2
            GROUP BY (p.id)
        ) as consult;
    `,[userIdToken, date]);
}

const postsTimeline = {
    getTimeline,
    getAuthTimeLine,
    postUrlTimeLine,
    selectUserIdPost,
    deletePostIdLikes,
    deletePostId,
    updatePost,
    existingPost,
    getCountNewPosts
}

export default postsTimeline;