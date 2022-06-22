import connection from "../db.js";

async function fetchTrendingHashtags(){
    return connection.query(`
    SELECT COALESCE(COUNT (h1."hashtagId"), 0) as uses, h2.hashtag
        FROM "hashtagRelation" h1
        RIGHT JOIN hashtags h2 ON h1."hashtagId" = h2.id
        GROUP BY h2.hashtag
        ORDER BY uses DESC
    LIMIT 10`);
}

async function existingHashtag(string){
    return connection.query(`
    SELECT hashtags.* FROM hashtags WHERE hashtags.hashtag ILIKE ($1)`, [`%${string}`]);
}

async function insertHashtag(string){
    return connection.query(`
        INSERT INTO hashtags(hashtag)
        VALUES ($1) RETURNING id
    `, [string])
}

async function insertRelationHashtag(postId, hashtagId){
    return connection.query(`
        INSERT INTO "hashtagRelation" ("postId", "hashtagId")
        VALUES ($1,$2) RETURNING id
    `, [postId, hashtagId])
}

async function deleteRelationHashtag(postId){
    return connection.query(`
        DELETE FROM "hashtagRelation" 
        WHERE "hashtagRelation"."postId" = $1
    `,[postId])
}

async function selectUsingHashtag(string){
    return connection.query(`
        SELECT hashtags.* FROM hashtags 
        JOIN "hashtagRelation" ON "hashtagRelation"."hashtagId" = hashtags.id
        WHERE hashtags.hashtag ILIKE ($1)
    `,[`%${string}`])
}

async function deleteHashtag(string){
    return connection.query(`
        DELETE FROM hashtags WHERE hashtags.hashtag ILIKE ($1)
    `,[`%${string}`])
}

async function fetchUsersHashtag(string){
    return connection.query(`
        SELECT u."userName", u.picture, p.id as postId, p. "userId", p.link, p.text, p.title, p.description, p.image, 
        COALESCE(COUNT(l."postId"),0) AS likes, h1."postId", h2.id as "hashtagId", h2.hashtag
        FROM posts p
        LEFT JOIN likes l ON l."postId" = p.id
        JOIN "hashtagRelation" h1 ON h1."postId" = p.id
        JOIN hashtags h2 ON h2.id = h1."hashtagId"
        JOIN users u ON u.id = p."userId"
        WHERE h2."hashtag" ILIKE $1
        GROUP BY (p.id, u.id, h1.id, h2.id)
        ORDER BY p.id DESC
    `, [`#${string}`])
}
const hashtagsRepository = {
    fetchTrendingHashtags,
    existingHashtag,
    insertHashtag,
    insertRelationHashtag,
    fetchUsersHashtag,
    deleteRelationHashtag,
    selectUsingHashtag,
    deleteHashtag
}

export default hashtagsRepository;
