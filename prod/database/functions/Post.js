"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storePost = exports.findPost = void 0;
const Post_1 = require("../schemas/Post");
async function storePost(post) {
    try {
        const newPost = new Post_1.Post({
            date: post.timestamp,
            shortcode: post.shortcode,
            owner: post.owner.username,
            description: post.description,
            timestamp: post.timestamp,
            thumbnail: post.thumbnail,
            url: post.url,
        });
        await newPost.save();
        return true;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error saving post to database");
    }
}
exports.storePost = storePost;
async function findPost(post) {
    try {
        const result = await Post_1.Post.findOne({ shortcode: post.shortcode });
        if (result) {
            console.log("Post already exists in database");
            return true;
        }
        else {
            console.log("Post not found in database");
            return false;
        }
    }
    catch (error) {
        console.error(error);
        throw new Error("Error finding post in database");
    }
}
exports.findPost = findPost;
