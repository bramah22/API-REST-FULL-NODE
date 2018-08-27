import { Router, Request, Response , NextFunction } from 'express';
import User from '../models/User';


export class UserRouter {

    public router: Router ;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public getUsers(req: Request, res: Response): void {
        User.find()
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
    public getUser(req: Request, res: Response): void {
        const username: String = req.params.username;
        User.findOne({username}).populate('posts' , 'title content')
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
    public updateUser(req: Request, res: Response): void {
        const username: String = req.params.username;
        User.findOneAndUpdate({username} , req.body )
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
    public deleteUser(req: Request, res: Response): void {
        const username: String = req.params.username;
        User.findOneAndRemove({username})
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
    public createUser(req: Request, res: Response): void {

        const name        : String = req.body.name;
        const username    : String = req.body.username;
        const email       : String = req.body.email;
        const password    : String = req.body.password;
        const posts       : String[] = req.body.posts;

        const user = new User({
            name,
            username,
            email,
            password,
            posts
        });
        user.save()
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
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.delete('/:username', this.deleteUser);
        this.router.put('/:username', this.updateUser);
    }
}
