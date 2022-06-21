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


export async function getComments(req, res){
    const { postId } = req.body;
    const { id } = res.locals.userId;

    try {
        const selectComments = await commentRepository.selectComments(id, postId)
        res.status(200).send(selectComments.rows);
    } catch (esrror) {
        console.log(error);
        res.sendStatus(500);
    }
}