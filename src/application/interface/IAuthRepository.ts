import { User } from "../../domain/User";

export interface IAuthRepository {
    registerUser(user: User): Promise<boolean>;
    loginUser(user: User): Promise<boolean>;
    updateUser(user: User): Promise<boolean>;
    logoutUser(user: User): Promise<boolean>;
}