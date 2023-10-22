import { inject, injectable } from "inversify";

import { User } from "../domain/User";
import { IUserRepository } from "./interface/IRepository";
import { TYPES } from "../types";

@injectable()
export class UserUseCase {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

    getUsers(): User[] {
        // Simulated data for demonstration purposes
        return this.userRepository.findAll();

        // return [
        //     new User(1, "John Doe", "john@example.com"),
        //     new User(2, "Jane Smith", "jane@example.com"),
        // ];
    }
}