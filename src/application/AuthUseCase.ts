import { inject, injectable } from "inversify";
import { Logger } from "winston";
import { TYPES } from "../types";
import { IAuthRepository } from "./interface/IAuthRepository";
import { User } from "../domain/User";

@injectable()
export class AuthUseCase {
    constructor(@inject(TYPES.IAuth) private iAuth: IAuthRepository,
        @inject(TYPES.Logger) private logger: Logger
    ) { }

    async registerUser(user: User): Promise<boolean> {
        return this.iAuth.registerUser(user);
    }

    async loginUser(user: User): Promise<boolean> {
        return this.iAuth.loginUser(user);
    }

    async updateUser(user: User): Promise<boolean> {
        return this.iAuth.updateUser(user);
    }
}

