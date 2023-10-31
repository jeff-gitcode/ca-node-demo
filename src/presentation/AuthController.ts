import { inject } from "inversify";
import { Request, Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import { AuthUseCase } from "../application/AuthUseCase";
import { User } from "../domain/User";
import { TYPES } from "../types";
import { IAuthUseCase } from "../application/interface/IAuthUseCase";


@controller("/auth")
export class AuthController {
    // constructor(@inject(AuthUseCase) private authUseCase: AuthUseCase) { }
    constructor(@inject(TYPES.IAuthUseCase) private authUseCase: IAuthUseCase) { }
    @httpPost('/register')
    async registerUser(@request() req: Request, @response() res: Response) {
        try {
            // Hash password
            const hash = await bcrypt.hash(req.body.password, 10);

            const newUser: User = new User(1, req.body.name, req.body.email, hash);

            // Create token
            // node
            // require("crypto").randomBytes(35).toString("hex")
            const payload = { user_id: newUser.id, email: newUser.email };
            const jwt_secret = process.env.JWT_SECRET;
            const options = {
                expiresIn: "2h",
            };

            const token = jwt.sign(
                payload,
                jwt_secret!,
                options
            );

            newUser.token = token;

            await this.authUseCase.registerUser(newUser);

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