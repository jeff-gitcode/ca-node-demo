import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

// import { UserUseCase } from "../application/UserUseCase";
import { User } from "../domain/User";
import { TYPES } from "../types";
import { IUserUseCase } from "../application/interface/IUserUseCase";

@controller("/users")
export class UserController {
    // constructor(@inject(UserUseCase) private userUseCase: UserUseCase) { }
    constructor(@inject(TYPES.IUserUseCase) private userUseCase: IUserUseCase) { }

    @httpGet("/")
    async getUsers(@request() _: Request, @response() res: Response) {
        try {
            const users = await this.userUseCase.getUsers();
            return res.json(users);
        } catch (err) {
            res.status(500).send('Internal Server Error');
            return res.json(err);
        }
    }

    @httpGet("/:id")
    async getUser(@request() req: Request, @response() res: Response) {
        try {
            const user = await this.userUseCase.getUser(req.params.id);
            return res.json(user);
        } catch (err) {
            return res.json(err);
        }
    }

    @httpPost("/")
    async createUser(@request() req: Request, @response() res: Response) {
        try {
            const newUser: User = new User(3, req.body.name, req.body.email);
            const user = await this.userUseCase.createUser(newUser);
            return res.json(user);
        } catch (err) {
            return res.json(err);
        }
    }

    @httpPatch("/")
    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.userUseCase.updateUser(req.body);
            return res.json(user);
        } catch (err) {
            return res.json(err);
        }
    }

    @httpDelete("/:id")
    async deleteUser(req: Request, res: Response) {
        try {
            const user = await this.userUseCase.deleteUser(req.params.id);
            return res.json(user);
        } catch (err) {
            return res.json(err);
        }
    }
}