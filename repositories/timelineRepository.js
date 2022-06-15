import connection from "../db.js";


const LIMIT_POSTS = 20;

async function getTimeline() {

    return connection.query(`
        SELECT * FROM posts ORDER BY ("createdAt") DESC LIMIT ${LIMIT_POSTS}
    `);
}

const postsTimeline = {
    getTimeline
}

export default postsTimeline;