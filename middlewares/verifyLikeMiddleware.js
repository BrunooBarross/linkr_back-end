import  toggleLikesRouter  from "../repositories/likesRepository.js";

export default async function verifyLikeMiddleware(req, res, next) {
    const {postId} = req.body;
    const { id } = res.locals.userId;
    
    try {
        const hasLike = await toggleLikesRouter.verifyLikes(postId, id);

        if(hasLike.rowCount > 0){
            return res.sendStatus(403);
        }

        next();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500); // server error
    }
}