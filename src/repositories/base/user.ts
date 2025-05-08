import { User } from "../../domain/entities/user";

export interface UserRepository {
  save: (user: User) => Promise<void>;
  findByEmail: (email: string) => Promise<User | undefined>;
}
