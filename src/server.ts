// les importations

import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

// imports routers
import { PostRouter } from './router/PostRouter';
import { UserRouter } from './router/UserRouter';

const postRouter = new PostRouter();
const userRouter = new UserRouter();

//server class
class Server {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {

        // set up mongoose
        const MONGO_URI: string = 'mongodb://localhost/test';
        mongoose.connect(MONGO_URI ||  process.env.MONGOBD_URI);

        //config
        this.app.use(bodyParser.urlencoded({extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(compression());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(cors());
    }

    public routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use('/' , router);
        this.app.use('/api/v1/posts' , postRouter.router);
        this.app.use('/api/v1/users' , userRouter.router);
    }
}

//export
export default new Server().app;