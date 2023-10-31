import { User } from "../../domain/User";


export interface IAuthUseCase {
    registerUser(user: User): Promise<boolean>;
    loginUser(user: User): Promise<boolean>;
    updateUser(user: User): Promise<boolean>;
}
