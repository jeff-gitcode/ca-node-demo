import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import 'dotenv/config';
// import { json } from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3111",
            },
        ],
    },
    apis: ["./src/presentation/*.js"],
};

const specs = swaggerJsdoc(options);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            customCssUrl:
                "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
        })
    );
    // app.use(json());
});

// server.build().get('/', (request, response) => {
//     response.send('Hello, GraphQL!')
// })

server.build().listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});