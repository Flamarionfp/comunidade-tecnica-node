import { User } from "../../domain/entities/user";
import { UserRepository } from "../base/user";

export class InMemoryUserRepository implements UserRepository {
  public readonly users: User[] = [];

  save = async (user: User) => {
    this.users.push(user);
  };

  findByEmail = (email: string) => {
    const user = this.users.find((user) => user.email.value === email);

    return Promise.resolve(user);
  };
}
