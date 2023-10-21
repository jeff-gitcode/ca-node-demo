import { injectable } from "inversify";

import { User } from "../domain/User";

@injectable()
export class UserUseCase {
    getUsers(): User[] {
        // Simulated data for demonstration purposes
        return [
            new User(1, "John Doe", "john@example.com"),
            new User(2, "Jane Smith", "jane@example.com"),
        ];
    }
}