import postsTimeline from "../repositories/timelineRepository.js";

export async function timeline(req, res) {
    const { id } = res.locals.userId;

    try {
        const lastPosts = await postsTimeline.getTimeline();
        const lastPosts2 = await postsTimeline.getAuthTimeLine(id)

        for (let i = 0; i < lastPosts.rows.length; i++) {
            lastPosts.rows[i] = { ...lastPosts.rows[i], liked: false }
        }

        for (let i = 0; i < lastPosts.rows.length; i++) {
            for (let j = 0; j < lastPosts2.rows.length; j++) {
                if (lastPosts.rows[i].id === lastPosts2.rows[j].id) {
                    lastPosts.rows[i] = { ...lastPosts.rows[i], liked: true }
                }
            }
        }

        res.status(201).send(lastPosts.rows);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}