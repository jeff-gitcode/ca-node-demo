"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_config_1 = __importDefault(require("./inversify.config"));
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default);
server.build().listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
