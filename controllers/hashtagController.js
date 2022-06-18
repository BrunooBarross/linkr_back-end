import hashtagsRepository from "../repositories/hashtagRepository.js";

export async function getTrendingHashtags(req, res){
    try {
        const consult = await hashtagsRepository.fetchTrendingHashtags();
        res.status(200).send(consult.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}