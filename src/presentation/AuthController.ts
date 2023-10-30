import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";

import { AuthUseCase } from "../application/AuthUseCase";
import { User } from "../domain/User";

@controller("/auth")
export class AuthController {
    constructor(@inject(AuthUseCase) private authUseCase: AuthUseCase) { }

    @httpPost('/register')
    async registerUser(@request() req: Request, @response() res: Response) {
        try {
            const newUser: User = new User(1, req.body.name, req.body.password, req.body.email);
            const result = await this.authUseCase.registerUser(newUser);
            return res.json(newUser);
        } catch (err) {
            return res.json(err);
        }
    }

    @httpGet('/login')
    async loginUser(@request() req: Request, @response() res: Response) {
        try {
            const user: User = new User(1, req.body.name, req.body.password, req.body.email);
            const result = await this.authUseCase.loginUser(user);
            return res.json(result);
        } catch (err) {
            return res.json(err);
        }
    }

}