import { injectable } from "inversify";
import { IUserRepository } from "../application/interface/IRepository";
import { User } from "../domain/User";
import { users } from "./db";

@injectable()
export class UserRepository implements IUserRepository {
    async create(item: User): Promise<User | null> {
        users.push(item);
        return item;
    }

    async update(item: User): Promise<User | null> {
        users.forEach((user, index) => {
            if (user.id === item.id) {
                users[index] = item;
            }
        });

        return item;
    }

    async delete(id: string): Promise<boolean> {
        users.forEach((user, index) => {
            if (user.id.toString() === id) {
                users.splice(index, 1);
            }
        });

        return true;
    }
    async find(id: string): Promise<User | null> {
        let user: User | null = null;

        users.forEach((item) => {
            if (item.id.toString() === id) {
                user = item;
            }
        });

        return user;
    }

    async findAll(): Promise<User[]> {
        return users;
    }
}