"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const UserUseCase_1 = require("./application/UserUseCase");
const UserController_1 = require("./presentation/UserController");
const container = new inversify_1.Container();
container.bind(UserController_1.UserController).toSelf();
container.bind(UserUseCase_1.UserUseCase).toSelf();
exports.default = container;
