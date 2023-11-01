import 'reflect-metadata';

import { IUserUseCase } from "../../../application/interface/IUserUseCase";
import { UserResolver } from "./users.resolver";
import { User } from '../../../domain/User';

describe('UserResolver', () => {
    let resolver: UserResolver;
    const users: User[] = [new User(1, 'name', 'email')];
    const userUseCase: IUserUseCase = {
        getUsers: jest.fn().mockReturnValue(Promise.resolve(users)),
        getUser: jest.fn().mockReturnValue(Promise.resolve(users[0])),
        createUser: jest.fn().mockReturnValue(Promise.resolve(users[0])),
        updateUser: jest.fn(),
        deleteUser: jest.fn()
    };

    beforeEach(async () => {
        resolver = new UserResolver(userUseCase);

    });

    test("when_getUsers_should_returns", async () => {
        const actual = await resolver.users();

        expect(userUseCase.getUsers).toHaveBeenCalledTimes(1);
        expect(actual).toEqual(users);
    });

    test("when_createUser_should_returns", async () => {
        const { id, name, email } = users[0];
        const actual = await resolver.addUser(id, name, email);

        expect(userUseCase.createUser).toHaveBeenCalledTimes(1);
        expect(actual).toEqual(users[0]);
    });

});