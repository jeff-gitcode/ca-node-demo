import { inject, injectable } from "inversify";
import { Query, Resolver } from "type-graphql";
import { TYPES } from "../../../types";
import { IUserUseCase } from "../../../application/interface/IUserUseCase";
import { User } from "../../../domain/User";

@injectable()
@Resolver()
export class UserResolver {
    constructor(@inject(TYPES.IUserUseCase) private userUseCase: IUserUseCase) { }

    @Query(() => [User])
    async users() {
        try {
            const users = await this.userUseCase.getUsers();
            return users;
        } catch (err) {
            return err;
        }
    }
}