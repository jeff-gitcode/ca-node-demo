import { User } from "../../domain/User";

export interface IRepository<T> {
    create(item: T): Promise<T | null>;
    update(item: T): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    find(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
}

export interface IUserRepository extends IRepository<User> { }