import { User } from "@prisma/client";

export interface IUserRepository {
  getById(id: string): Promise<User>;
  getByName(name: string): Promise<User>;
  create(user: User): Promise<void>;
}
