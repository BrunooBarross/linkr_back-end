import connection from '../db.js'

async function verifyFollower(followerId, followId){
    return connection.query(`
        SELECT * FROM followers f WHERE f."followerId" = $1 AND f."followId" = $2;
    `, [followerId, followId])
}
async function createFollower(followerId, followId) {
    return connection.query(`
        INSERT INTO followers ("followerId", "followId") VALUES ($1, $2)`, [followerId, followId]);
}

async function deleteRelationFollower(followerId, followId) {
    return connection.query(`
        DELETE FROM followers f WHERE f."followerId" = $1 AND f."followId" = $2;`, [followerId, followId]);
}

const followerRepository = {
    createFollower,
    verifyFollower,
    deleteRelationFollower
}

export default followerRepository;