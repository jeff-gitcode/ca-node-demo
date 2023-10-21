import { Container } from "inversify";
import { UserUseCase } from "./application/UserUseCase";
import { UserController } from "./presentation/UserController";

const container = new Container();

container.bind<UserController>(UserController).toSelf();
container.bind<UserUseCase>(UserUseCase).toSelf();

export default container;