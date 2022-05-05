const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "姓名必填"]
        },
        content: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        tags: {
            type: Number,
        },
        likes: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: false
        }
    },
    {
        versionKey: false
    });
const Post = mongoose.model('Post', postSchema);

module.exports = Post;