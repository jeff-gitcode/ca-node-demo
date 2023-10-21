import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { UserUseCase } from "../application/UserUseCase";

@controller("/users")
export class UserController {
    constructor(@inject(UserUseCase) private userUseCase: UserUseCase) { }

    @httpGet("/")
    async getUsers(_: Request, res: Response) {
        const users = this.userUseCase.getUsers();
        return res.json(users);
    }
}