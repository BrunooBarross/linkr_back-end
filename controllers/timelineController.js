import postsTimeline from "../repositories/timelineRepository.js";

export async function timeline(req, res) {

    try {
        const lastPosts = await postsTimeline.getTimeline() ;

        res.status(201).send(lastPosts.rows);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}