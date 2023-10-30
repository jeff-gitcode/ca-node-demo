import { Container } from "inversify";
import { UserUseCase } from "./application/UserUseCase";
import { UserController } from "./presentation/UserController";
import { IUserRepository } from "./application/interface/IRepository";
import * as winston from 'winston';

// import { UserRepository } from "./infrastructure/UserRepository";
import { TYPES } from "./types";
import { JsonPlaceHolderUserRepository } from "./infrastructure/jsonplaceholder/JsonPlaceHolderUserRepository";
import { AuthUseCase } from "./application/AuthUseCase";
import { IAuthRepository } from "./application/interface/IAuthRepository";
import { AuthRepository } from "./infrastructure/mockdb/AuthRepository";
import { AuthController } from "./presentation/AuthController";

const container = new Container();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log' }),
    ],
    format: winston.format.printf(
        (log) => `[${log.level.toUpperCase()}] - ${log.message}`,
    ),
});

container.bind<winston.Logger>(TYPES.Logger).toConstantValue(logger);

container.bind<UserController>(UserController).toSelf();
container.bind<AuthController>(AuthController).toSelf();

container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<AuthUseCase>(AuthUseCase).toSelf();

container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(JsonPlaceHolderUserRepository);
// container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export default container;