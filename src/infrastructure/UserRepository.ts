import { injectable } from "inversify";
import { IUserRepository } from "../application/interface/IRepository";
import { User } from "../domain/User";

@injectable()
export class UserRepository implements IUserRepository {
    create(item: User): User | null {
        console.log(item);
        throw new Error("Method not implemented.");
    }
    update(item: User): User | null {
        console.log(item);
        throw new Error("Method not implemented.");
    }
    delete(id: string): boolean {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    find(id: string): User | null {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    findAll(): User[] {
        return [
            new User(1, "John Doe", "john@example.com"),
            new User(2, "Jane Smith", "jane@example.com"),
        ];
    }
}