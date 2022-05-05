const Post = require("../models/post");
const handleSuccess = require("../service/handleSuccess");
const errorHandle = require("../service/errorHandle");

const posts = {
    async getPosts(req, res) {
        const posts = await Post.find();
        handleSuccess(res, posts);
    },
    async createdPosts({ body, req, res }) {
        try {
            const data = JSON.parse(body);
            const newPost = await Post.create(
                {
                    name: data.name,
                    content: data.content,
                    image: data.image,
                    tags: data.tags,
                    likes: data.likes
                }
            )
            handleSuccess(res, newPost);
        } catch (error) {
            errorHandle(res, error);
        }
    },
}
module.exports = posts;