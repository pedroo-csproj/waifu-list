import { User } from "@prisma/client";
import { uuid } from "uuidv4";

import { hashPassword } from "domain/helpers/password.helper";
import { RegisterUserCommandRequest } from "./registerUser.command.request";

export function mapRegisterUserCommandRequestToUser(commandRequest: RegisterUserCommandRequest): User {
  const user: User = {
    id: uuid(),
    name: commandRequest.name,
    password: hashPassword(commandRequest.password),
    createDate: new Date(),
  };

  return user;
}
