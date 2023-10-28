import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import { json } from "express";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(json());
});

server.build().listen(3111, () => {
    console.log("Server started on http://localhost:3111");
});