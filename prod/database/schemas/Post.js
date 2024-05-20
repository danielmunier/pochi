"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    date: Date,
    shortcode: String,
    owner: String,
    description: String,
    timestamp: Number,
    thumbnail: String,
    url: String,
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
