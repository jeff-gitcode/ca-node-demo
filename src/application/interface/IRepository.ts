import { User } from "../../domain/User";

export interface IRepository<T> {
    create(item: T): T | null;
    update(item: T): T | null;
    delete(id: string): boolean;
    find(id: string): T | null;
    findAll(): T[];
}

export interface IUserRepository extends IRepository<User> { }