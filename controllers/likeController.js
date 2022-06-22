
import likesRepository from "../repositories/likesRepository.js";

export async function postLike(req, res) {
    const {postId} = req.body;
    const { id } = res.locals.userId;


    try {
        await likesRepository.postLike(postId, id);

        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteUserLike(req, res) {
    const {postId} = req.params;
    const { id } = res.locals.userId;
    try {
        const deleteCount = await likesRepository.deleteLike(postId, id);

        if(!deleteCount.rowCount){
            return res.sendStatus(409);
        }
        
        return res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}