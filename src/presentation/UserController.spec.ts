import 'reflect-metadata';

import { Request, Response } from "express";
import { IUserUseCase } from "../application/interface/IUserUseCase";
import { User } from "../domain/User";
import { UserController } from "./UserController";

describe('UserResolver', () => {
    let controller: UserController;
    const users: User[] = [new User(1, 'name', 'email')];
    const userUseCase: IUserUseCase = {
        getUsers: jest.fn().mockReturnValue(Promise.resolve(users)),
        getUser: jest.fn().mockReturnValue(Promise.resolve(users[0])),
        createUser: jest.fn().mockReturnValue(Promise.resolve(users[0])),
        updateUser: jest.fn(),
        deleteUser: jest.fn()
    };

    beforeEach(async () => {
        controller = new UserController(userUseCase);
    });

    test("when_getUsers_should_returns", async () => {
        const req = ({} as unknown) as Request;
        const res = ({
            status: jest.fn(),
            json: jest.fn()
        } as unknown) as Response;

        await controller.getUsers(req, res);

        expect(userUseCase.getUsers).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(users);
    });

    test("when_createUser_should_returns", async () => {
        const req = ({
            body: users[0]
        } as unknown) as Request;
        const res = ({
            status: jest.fn(),
            json: jest.fn()
        } as unknown) as Response;

        await controller.createUser(req, res);

        expect(userUseCase.createUser).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith(users[0]);
    });
})