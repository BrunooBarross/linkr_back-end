import postsTimeline from "../repositories/timelineRepository.js";
import { bodyCommentSchema } from "../schemas/comentSchema.js";

export async function checkComment(req, res, next) {
    const values = req.body;

    const { error } = bodyCommentSchema.validate(values);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const existingPost = await postsTimeline.existingPost(req.body.postId)
        if (existingPost.rowCount === 0) {
            return res.sendStatus(404);
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function verifyExistingPost(req, res, next){
    try {
        const existingPost = await postsTimeline.existingPost(req.headers.postid)
        if (existingPost.rowCount === 0) {
            return res.sendStatus(404);
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}