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

const hashtagsRepository = {
    fetchTrendingHashtags
}

export default hashtagsRepository;