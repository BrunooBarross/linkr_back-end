import hashtagsRepository from "../repositories/hashtagRepository.js";
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