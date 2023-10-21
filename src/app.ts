import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";

const server = new InversifyExpressServer(container);

server.build().listen(3111, () => {
    console.log("Server started on http://localhost:3111");
});