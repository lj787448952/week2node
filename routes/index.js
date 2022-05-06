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
        PostsControllers.deletePosts(req, res);
    } else if (req.url.startsWith("/posts/") && method == 'DELETE') {
        PostsControllers.deletePost(req, res);
    } else if (req.url.startsWith("/posts/") && method == 'PATCH') {
        req.on('end', async () => {
            PostsControllers.updatePost({ body, req, res });
        });
    } else if (method == 'OPTIONS') {
        HttpControllers.cors(req, res);
    } else {
        HttpControllers.notFound(req, res);
    }

}
module.exports = routes;