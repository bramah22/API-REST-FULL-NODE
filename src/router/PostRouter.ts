import { Router, Request, Response , NextFunction } from 'express';
import Post from '../models/Post';


export class PostRouter {

    public router: Router ;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getPosts(req: Request, res: Response): void {
        Post.find()
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
                })
            })
    }
    public getPost(req: Request, res: Response): void {
        const slug: String = req.params.slug;
        Post.findOne({slug})
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
                })
            })
    }
    public updatePost(req: Request, res: Response): void {
        const slug: String = req.params.slug;
        Post.findOneAndUpdate({slug} , req.body )
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
                })
            })
    }
    public deletePost(req: Request, res: Response): void {
        const slug: String = req.params.slug;
        Post.findOneAndRemove({slug})
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
                })
            })
    }
    public createPost(req: Request, res: Response): void {

        const title            : String = req.body.title;
        const slug             : String = req.body.slug;
        const content          : String = req.body.content;
        const featuredImage    : String = req.body.featuredImage;

        const post = new Post({
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
                })
            })
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:slug', this.getPost);
        this.router.post('/', this.createPost);
        this.router.delete('/:slug', this.deletePost);
        this.router.put('/:slug', this.updatePost);
    }
}
