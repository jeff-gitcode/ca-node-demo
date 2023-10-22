import { Container } from "inversify";
import { UserUseCase } from "./application/UserUseCase";
import { UserController } from "./presentation/UserController";
import { IUserRepository } from "./application/interface/IRepository";
import { UserRepository } from "./infrastructure/UserRepository";
import { TYPES } from "./types";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export default container;