import { instagramPost } from "../../types";
import { Post } from "../schemas/Post"



async function storePost(post: instagramPost): Promise<boolean> {
    try {
       
            const newPost = new Post({
                date: post.timestamp,
                shortcode: post.shortcode,
                owner: post.owner.username,
                description: post.description,
                timestamp: post.timestamp,
                thumbnail: post.thumbnail,
                url: post.url,
            })

            await newPost.save()
            return true
        }
        catch (error) {
            console.error(error)
            throw new Error("Error saving post to database")
        }
}

async function findPost(post: instagramPost): Promise<boolean> {
    try {
            const result = await Post.findOne({shortcode: post.shortcode})
            if(result) {
                console.log("Post already exists in database")
                return true
            } else {
                console.log("Post not found in database")
                return false
            }
        }
        catch (error) {
            console.error(error)
            throw new Error("Error finding post in database")
        }
}


export { findPost, storePost}
