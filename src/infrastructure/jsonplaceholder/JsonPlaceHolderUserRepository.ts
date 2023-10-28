import { injectable } from "inversify";

import { IUserRepository } from "../../application/interface/IRepository";
import { User } from "../../domain/User";

@injectable()
export class JsonPlaceHolderUserRepository implements IUserRepository {
    async create(item: User): Promise<User | null> {

        const options = {
            method: 'POST',
            body: JSON.stringify(item),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, options);
        const users = await response.json();
        return users;

        console.log("🚀 ~ file: JsonPlaceHolderUserRepository.ts:9 ~ JsonPlaceHolderUserRepository ~ create ~ item:", item)
        throw new Error("Method not implemented.");
    }
    async update(item: User): Promise<User | null> {

        const options = {
            method: 'PUT',
            // cache: 'no-cache',
            body: JSON.stringify(item),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        const response = await fetch(`https://jsonplaceholder.typicode.com/users`, options);
        const users = await response.json();
        return users;

        console.log("🚀 ~ file: JsonPlaceHolderUserRepository.ts:13 ~ JsonPlaceHolderUserRepository ~ update ~ item:", item)
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        console.log("🚀 ~ file: JsonPlaceHolderUserRepository.ts:17 ~ JsonPlaceHolderUserRepository ~ delete ~ id:", id)
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<User | null> {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const users = await response.json();
        return users;
    }
    async findAll(): Promise<User[]> {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users;
        throw new Error("Method not implemented.");
    }

}