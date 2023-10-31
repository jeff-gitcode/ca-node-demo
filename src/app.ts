import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import 'dotenv/config';
// import { json } from "express";
import * as bodyParser from "body-parser";
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { makeExecutableSchema } from "@graphql-tools/schema";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./presentation/graphql/schemas/user.schema";
import { UserResolver } from "./presentation/graphql/resolvers/users.resolver";
import { TYPES } from "./types";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
// import { typeDefs } from "./presentation/graphql/schemas/book.schema";
// import { resolvers } from "./presentation/graphql/resolvers/books.resolver";

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

async function generateSchema(): Promise<GraphQLSchema> {
    try {
        const schema = await buildSchema({
            container,
            resolvers: [
                UserResolver,
            ]
        })
        return schema
    } catch (e) {
        console.error(e)
        throw e
    }
}

const serverBuilder = new InversifyExpressServer(container);

serverBuilder.setConfig(async (app) => {
    app.use(cors());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    // app.use(
    //     "/api-docs",
    //     swaggerUi.serve,
    //     swaggerUi.setup(specs, {
    //         explorer: true,
    //         customCssUrl:
    //             "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    //     })
    // );
    // app.use(json());

    // const resolvers = container.get<UserResolver>(TYPES.UserResolver);
    const schema = await generateSchema();
    const server = new ApolloServer({ schema });
    await server.start();

    app.use(
        expressMiddleware(server)
    );

});


// server.build().get('/', (request, response) => {
//     response.send('Hello, GraphQL!')
// })

serverBuilder.build().listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});