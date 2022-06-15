const LIMIT_POSTS = 20;

import connection from "../db.js";


async function getTimeline() {

    return connection.query(`
        SELECT * FROM posts ORDER BY ("createdAt") DESC LIMIT ${LIMIT_POSTS}
    `);
}

const postsTimeline = {
    getTimeline
}

export default postsTimeline;