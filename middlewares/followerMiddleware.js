import followerRepository from "../repositories/followerRepository.js";

export async function verifyPostFollow(req, res, next){
    const userId = req.headers.id;
    const { id } = res.locals.userId;
    try {
        const selectFollower = await followerRepository.verifyFollower(id, userId);
        if(selectFollower.rowCount > 0){
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(404); // server error
    }
}

export async function verifyDeleteFollow(req, res, next){
    const userId = req.headers.id;
    const { id } = res.locals.userId;
    try {
        const selectFollower = await followerRepository.verifyFollower(id, userId);
        if(selectFollower.rowCount === 0){
            return res.sendStatus(404);
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
    }
}