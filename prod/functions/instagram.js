"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPost = void 0;
const instaTouch = require("instatouch");
require("dotenv")
    .config();
async function findMostRecentPost(posts) {
    let maisRecente = null;
    let maiorTimestamp = 0;
    for (const post of posts) {
        const timestamp = post.taken_at_timestamp;
        if (timestamp > maiorTimestamp) {
            maiorTimestamp = timestamp;
            maisRecente = post;
        }
    }
    return maisRecente;
}
async function getLatestPost(profile_user) {
    try {
        const postOptions = {
            count: 5,
            mediaType: "all",
            session: process.env.INSTAGRAM_SESSION_ID,
            bulk: false,
        };
        const userOptions = {
            count: 1,
            mediaType: "all",
            session: process.env.INSTAGRAM_SESSION_ID,
            bulk: false,
        };
        const posts = await instaTouch.user(profile_user, postOptions);
        const user = await instaTouch.getUserMeta(profile_user, userOptions);
        let latestPosts = posts.collector;
        let mostRecentPost = await findMostRecentPost(latestPosts);
        const userData = {
            username: profile_user,
            profileIconURL: user.graphql.user.profile_pic_url_hd,
        };
        const postData = {
            shortcode: mostRecentPost.shortcode,
            owner: userData,
            description: mostRecentPost.description,
            timestamp: mostRecentPost.taken_at_timestamp,
            thumbnail: mostRecentPost.thumbnail_src,
            url: `https://instagram.com/p/${mostRecentPost.shortcode}`,
        };
        return postData;
    }
    catch (e) {
        console.error("Error fetching Instagram data: " + e);
        if (e == "Can't find requested data") {
            console.log("Fetching instagram isnt possible now. Try to update your session_id");
            throw e;
        }
        throw e;
    }
}
exports.getLatestPost = getLatestPost;
