import { inject, injectable } from "inversify";

import { User } from "../domain/User";
import { IUserRepository } from "./interface/IRepository";
import { TYPES } from "../types";
import { Logger } from "winston";

@injectable()
export class UserUseCase {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.Logger) private logger: Logger
    ) { }

    async getUsers(): Promise<User[]> {
        this.logger.info('Getting all users');
        // Simulated data for demonstration purposes
        return await this.userRepository.findAll();
    }

    async getUser(id: string): Promise<User | null> {
        return await this.userRepository.find(id);
    }

    async createUser(user: User): Promise<User | null> {
        return await this.userRepository.create(user);
    }

    async updateUser(user: User): Promise<User | null> {
        return await this.userRepository.update(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.delete(id);
    }
}