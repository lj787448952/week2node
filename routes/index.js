const errorHandle = require("../service/errorHandle");
const handleSuccess = require("../service/handleSuccess");
const Post = require("../models/post");
const HttpControllers = require("../controllers/http");
const PostsControllers = require("../controllers/posts");

const routes = async (req, res) => {
    const { url, method } = req;
    console.log(method, url);
    let body = '';
    req.on('data', chunk => {
        body += chunk
    });
    if (req.url === '/' && method == 'GET') {
        PostsControllers.getPosts(req, res);
    } else if (req.url === '/posts' && method == 'POST') {
        req.on('end', async ({ body, req, res }) => PostsControllers.createdPosts({ body, req, res }))

    } else if (req.url === '/posts' && method == 'DELETE') {
        const posts = await Post.deleteMany({});
        handleSuccess(res, posts);
    } else if (req.url.startsWith("/posts/") && method == 'DELETE') {
        const id = req.url.split('/').pop();
        const posts = await Post.findByIdAndDelete(id);
        handleSuccess(res, posts);
    } else if (req.url.startsWith("/posts/") && method == 'PATCH') {
        req.on('end', async () => {
            try {
                const id = req.url.split('/').pop();
                const data = JSON.parse(body);
                const posts = await Post.findByIdAndUpdate(id, data);
                handleSuccess(res, posts);
            } catch (error) {
                errorHandle(res, error);
            }
        });
    } else if (method == 'OPTIONS') {
        HttpControllers.cors(req, res);
    } else {
        HttpControllers.notFound(req, res);
    }

}
module.exports = routes;