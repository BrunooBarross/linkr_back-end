import hashtagsRepository from "../repositories/hashtagRepository.js";
import postsTimeline from "../repositories/timelineRepository.js";
import { filterHashtags } from "../schemas/hashtagsSchema.js";
import { validateDateSchema } from "../schemas/postSchema.js";

export async function timeline(req, res) {
    const { id } = res.locals.userId;

    try {
        const lastPosts = await postsTimeline.getTimeline(id);
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
    const  { arrayHashtags }  = res.locals;
   
    try {
        const insertPost = await postsTimeline.postUrlTimeLine(userId, link, text);
        if(arrayHashtags.length === 0 ){
            return res.sendStatus(201);
        }
        postHashtag(insertPost.rows[0].id, arrayHashtags, res);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function postHashtag(postId, arrayHashtags, res) {
    try {
        for (let i = 0; i < arrayHashtags.length; i++) {
            const existingHashtag = await hashtagsRepository.existingHashtag(arrayHashtags[i]);
            if (existingHashtag.rowCount === 0) {
                const insertHashtag = await hashtagsRepository.insertHashtag(arrayHashtags[i]);
                const insertRelationHashtag = await hashtagsRepository.insertRelationHashtag(postId, insertHashtag.rows[0].id);
            }
            if (existingHashtag.rowCount > 0) {
                const insertRelationHashtag = await hashtagsRepository.insertRelationHashtag(postId, existingHashtag.rows[0].id);
            }
        }
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}

export async function deletePost(req, res) {
    const postId = req.headers.id;
    const { postText } = res.locals;
    const array = filterHashtags(postText);

    try {
        const deleteRelationHashtag = await hashtagsRepository.deleteRelationHashtag(postId);
        for (let i = 0; i < array.length; i++) {
            const verifyUsingHashtag = await hashtagsRepository.selectUsingHashtag(array[i]);
            if (verifyUsingHashtag.rowCount === 0) {
                const deleteHashtag = await hashtagsRepository.deleteHashtag(array[i]);
            }
        }
        await postsTimeline.deletePostIdLikes(postId);
        await postsTimeline.deletePostId(postId);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function updatePost(req, res) {
    const postId = req.headers.id;
    const userId = res.locals.userId.id;
    const { postText } = res.locals;
    const { arrayHashtags } = res.locals;
    const { link, text } = req.body;

    const array = filterHashtags(postText);

    try {
        if (arrayHashtags.length === 0 && array.length === 0) {
            const update = await postsTimeline.updatePost(userId, postId, link, text);
            return res.sendStatus(200);
        }
        updatePostAndHashtag(postId, userId, link, text, arrayHashtags, array, res);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function updatePostAndHashtag(postId, userId, link, text, arrayHashtags, array, res) {
    try {
        if (arrayHashtags.length > 0 && array.length === 0) {
            for (let i = 0; i < arrayHashtags.length; i++) {
                const existingHashtag = await hashtagsRepository.existingHashtag(arrayHashtags[i]);
                if (existingHashtag.rowCount === 0) {
                    const insertHashtag = await hashtagsRepository.insertHashtag(arrayHashtags[i]);
                    await hashtagsRepository.insertRelationHashtag(postId, insertHashtag.rows[0].id);
                }
                if (existingHashtag.rowCount > 0) {
                    await hashtagsRepository.insertRelationHashtag(postId, existingHashtag.rows[0].id);
                }
            }
            const update = await postsTimeline.updatePost(userId, postId, link, text);
            return res.sendStatus(200);
        }

        const deleteRelationHashtag = await hashtagsRepository.deleteRelationHashtag(postId);
        for (let i = 0; i < arrayHashtags.length; i++) {
            const existingHashtag = await hashtagsRepository.existingHashtag(arrayHashtags[i]);
            if (existingHashtag.rowCount === 0) {
                const insertHashtag = await hashtagsRepository.insertHashtag(arrayHashtags[i]);
                await hashtagsRepository.insertRelationHashtag(postId, insertHashtag.rows[0].id);
            }
            if (existingHashtag.rowCount > 0) {
                await hashtagsRepository.insertRelationHashtag(postId, existingHashtag.rows[0].id);
            }
        }
        for (let i = 0; i < array.length; i++) {
            const verifyUsingHashtag = await hashtagsRepository.selectUsingHashtag(array[i]);
            if (verifyUsingHashtag.rowCount === 0) {
                const deleteHashtag = await hashtagsRepository.deleteHashtag(array[i]);
            }
        }
        const update = await postsTimeline.updatePost(userId, postId, link, text);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getPostsByHashtag(req, res) {
    const { hashtag } = req.params;
    const { id } = res.locals.userId;
    try {
        const consult = await hashtagsRepository.fetchUsersHashtag(hashtag);
        if (consult.rowCount === 0) {
            return res.sendStatus(404);
        }
        const postsLikes = await postsTimeline.getAuthTimeLine(id);
        for (let i = 0; i < consult.rows.length; i++) {
            consult.rows[i] = { ...consult.rows[i], liked: false }
        }

        for (let i = 0; i < consult.rows.length; i++) {
            for (let j = 0; j < postsLikes.rows.length; j++) {
                if (consult.rows[i].postId === postsLikes.rows[j].id) {
                    consult.rows[i] = { ...consult.rows[i], liked: true }
                }
            }
        }
        res.status(200).send(consult.rows);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export async function countNewPosts(req, res){
    const { id } = res.locals.userId;
    const dataLastPost = {
        createdAt : req.headers.createdat
    }
    
    const { error } = validateDateSchema.validate(dataLastPost);

    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const countPosts = await postsTimeline.getCountNewPosts(id, dataLastPost.createdAt);
        console.log(countPosts)
        res.status(200).send(countPosts.rows[0]);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}