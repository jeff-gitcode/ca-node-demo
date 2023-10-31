import { User } from "../../domain/User";


export interface IUserUseCase {
    getUsers(): Promise<User[]>;
    getUser(id: string): Promise<User | null>;
    createUser(user: User): Promise<User | null>;
    updateUser(user: User): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
}
