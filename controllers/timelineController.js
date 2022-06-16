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

export async function publishPost(req, res){
    const userId = res.locals.userId.id;
    const { link, text } = req.body; 
    try {
        await postsTimeline.postUrlTimeLine(userId, link, text);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deletePost(req, res){
    const postId = req.headers.id;
     
    try {
        await postsTimeline.deletePostIdHash(postId);
        await postsTimeline.deletePostIdLikes(postId);
        await postsTimeline.deletePostId(postId);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function updatePost(req, res){
    const postId = req.headers.id;
    const userId = res.locals.userId.id;
    const { link, text } = req.body; 
    
    try {
        const update = await postsTimeline.updatePost(userId, postId, link, text);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}