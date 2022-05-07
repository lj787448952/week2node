const Post = require("../models/post");
const handleSuccess = require("../service/handleSuccess");
const errorHandle = require("../service/errorHandle");

const posts = {
    async getPosts(req, res) {
        const allPosts = await Post.find();
        handleSuccess(res, allPosts);
    },
    async createdPosts({ body, req, res }) {
        try {
            const data = JSON.parse(body);
            if (data.content) {
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
            } else {
                errorHandle(res);
            }
        } catch (error) {
            errorHandle(res, error);
        }
    },
    async deletePosts(req, res) {
        await Post.deleteMany({});
        handleSuccess(res, []);
    },
    async deletePost(req, res) {
        const { url } = req;
        const posts = await Post.find();
        const id = url.split('/').pop();
        const index = posts.findIndex(e => e._id === id);
        if (index !== -1) {
            await Post.findByIdAndDelete(id);
            const posts = await Post.find();
            handleSuccess(res, posts);
        } else {
            errorHandle(res, error);
        }
    },
    async updatePost(req, res) {
        const { url } = req;
        try {
            const data = JSON.parse(body);
            const posts = await Post.find();
            const id = url.split('/').pop();
            const index = posts.findIndex(e => e._id === id);
            if (index !== -1 && data.content) {
                await Post.findByIdAndUpdate(id, data);
                const posts = await Post.findById(id);
                handleSuccess(res, posts);
            } else {
                errorHandle(res, error);
            }
        } catch (error) {
            errorHandle(res, error);
        }
    }
}
module.exports = posts;