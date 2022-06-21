import followerRepository from "../repositories/followerRepository.js";

export async function postFollow(req, res){
    const userId = req.headers.id;
    const { id } = res.locals.userId;

    try {
        const insert = await followerRepository.createFollower(id, userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function unfollow(req, res){
    const userId = req.headers.id;
    const { id } = res.locals.userId;

    try {
        await followerRepository.deleteRelationFollower(id, userId);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}