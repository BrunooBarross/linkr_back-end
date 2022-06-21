import commentRepository from "../repositories/commentRepository.js";

export async function postComment(req, res){
    const { postId, comment } = req.body;
    const { id } = res.locals.userId;

    try {
        const insertComment = await commentRepository.postComment(id, postId, comment)
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}