"use strict";
// les importations
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
// imports routers
const PostRouter_1 = require("./router/PostRouter");
const UserRouter_1 = require("./router/UserRouter");
const postRouter = new PostRouter_1.PostRouter();
const userRouter = new UserRouter_1.UserRouter();
//server class
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        // set up mongoose
        const MONGO_URI = 'mongodb://localhost/test';
        mongoose.connect(MONGO_URI || process.env.MONGOBD_URI);
        //config
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(compression());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(cors());
    }
    routes() {
        let router;
        router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/posts', postRouter.router);
        this.app.use('/api/v1/users', userRouter.router);
    }
}
//export
exports.default = new Server().app;
