"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instaTouch = require("instatouch");
require("dotenv").config();
console.log("Instagram function ");
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
        console.log(latestPosts);
        let mostRecentPost = latestPosts[0];
        const postData = {
            user: {
                username: profile_user,
                iconURL: user.graphql.user.profile_pic_url_hd,
            },
            post: {
                shortcode: mostRecentPost.shortcode,
                description: mostRecentPost.description,
                thumbnail_src: mostRecentPost.thumbnail_src,
                post_link: `https://instagram.com/p/${mostRecentPost.shortcode}`,
            },
        };
        return postData;
    }
    catch (e) {
        console.error("Error fetching Instagram data: " + e);
        throw e;
    }
}
exports.default = getLatestPost;
