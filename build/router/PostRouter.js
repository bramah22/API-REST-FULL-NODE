"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../models/Post");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        Post_1.default.find()
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    getPost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOne({ slug })
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    updatePost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOneAndUpdate({ slug }, req.body)
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    deletePost(req, res) {
        const slug = req.params.slug;
        Post_1.default.findOneAndRemove({ slug })
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    createPost(req, res) {
        const title = req.body.title;
        const slug = req.body.slug;
        const content = req.body.content;
        const featuredImage = req.body.featuredImage;
        const post = new Post_1.default({
            title,
            slug,
            content,
            featuredImage
        });
        post.save()
            .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
            .catch((err) => {
            const status = res.statusCode;
            res.json({
                status,
                err
            });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:slug', this.getPost);
        this.router.post('/', this.createPost);
        this.router.delete('/:slug', this.deletePost);
        this.router.put('/:slug', this.updatePost);
    }
}
exports.PostRouter = PostRouter;
