import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    date: Date,
    shortcode: String,
    owner: String,
    description: String,
    timestamp: Number,
    thumbnail: String,
    url: String,
})




const Post = mongoose.model("Post", postSchema)

export {Post}

