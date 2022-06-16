import { bodyPostSchema } from "../schemas/postSchema.js";
import postsTimeline from "../repositories/timelineRepository.js";

export async function verifyPost(req, res, next) {
    const values = req.body;

    const { error } = bodyPostSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}

export async function verifyDeletePost(req, res, next) {
    const userId = res.locals.userId.id;
    const idPost = req.headers.id;
    try {
        const selectUserId = await postsTimeline.selectUserIdPost(idPost);
        if(selectUserId.rowCount === 0){
            return res.sendStatus(404);
        }
        if(userId !== selectUserId.rows[0].userId){
            return res.sendStatus(401);
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}