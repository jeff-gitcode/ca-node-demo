import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import 'dotenv/config';
// import { json } from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());
    // app.use(json());
});

// server.build().get('/', (request, response) => {
//     response.send('Hello, GraphQL!')
// })

server.build().listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});