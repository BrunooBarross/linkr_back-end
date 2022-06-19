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
    SELECT hashtags.id FROM hashtags WHERE hashtags.hashtag ILIKE ($1)`, [`%${string}%`]);
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

const hashtagsRepository = {
    fetchTrendingHashtags,
    existingHashtag,
    insertHashtag,
    insertRelationHashtag
}

export default hashtagsRepository;