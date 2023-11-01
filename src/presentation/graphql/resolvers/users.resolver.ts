import { inject, injectable } from "inversify";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
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

    @Query(() => User)
    async user(id: number) {
        try {
            const user = await this.userUseCase.getUser(id.toString());
            return user;
        } catch (err) {
            return err;
        }
    }

    @Mutation(() => User)
    async addUser(@Arg("id") id: number, @Arg("name") name: string, @Arg("email") email: string) {
        try {
            const newUser: User = new User(id, name, email);
            const user = await this.userUseCase.createUser(newUser);
            return user;
        } catch (err) {
            return err;
        }
    }

    @Mutation(() => User)
    async updateUser(id: number, name: string, email: string) {
        try {
            const newUser: User = new User(id, name, email);
            const user = await this.userUseCase.updateUser(newUser);
            return user;
        } catch (err) {
            return err;
        }
    }

    @Mutation(() => User)
    async deleteUser(id: number) {
        try {
            const user = await this.userUseCase.deleteUser(id.toString());
            return user;
        } catch (err) {
            return err;
        }
    }
}