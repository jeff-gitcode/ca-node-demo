import { injectable } from "inversify";
import { IAuthRepository } from "../../application/interface/IAuthRepository";
import { User } from "../../domain/User";

@injectable()
export class AuthRepository implements IAuthRepository {
    private authUsers: User[] = [];

    async loginUser(user: User): Promise<boolean> {
        return this.authUsers.some((authUser) => {
            return authUser.email === user.email && authUser.password === user.password;
        });
    }
    async updateUser(user: User): Promise<boolean> {
        return this.authUsers.some((authUser, index) => {
            if (authUser.id === user.id) {
                this.authUsers[index] = user;
                return true;
            }
            return false;
        });
    }
    async logoutUser(user: User): Promise<boolean> {
        return this.authUsers.some((authUser, index) => {
            if (authUser.id === user.id) {
                this.authUsers.splice(index, 1);
                return true;
            }
            return false;
        });
    }
    async registerUser(user: User): Promise<boolean> {
        this.authUsers.push(user);

        return this.authUsers.some((authUser) => {
            return authUser.email === user.email;
        });
    }
}