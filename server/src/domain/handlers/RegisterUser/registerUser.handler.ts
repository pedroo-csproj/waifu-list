import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { ResultModel } from "../../../crossCutting/result.model";
import { IUserRepository } from "../../repositories/user.repository";
import { validateUser } from "../../validators/user.validator";
import { RegisterUserCommandRequest } from "./registerUser.command.request";
import { mapRegisterUserCommandRequestToUser } from "./registerUser.mapper";

@CommandHandler(RegisterUserCommandRequest)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommandRequest, ResultModel<any>> {
  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository) {}

  async execute(commandRequest: RegisterUserCommandRequest): Promise<ResultModel<any>> {
    if ((await this.userRepository.getByName(commandRequest.name)) !== null)
      return new ResultModel<void>(false, ["name already registered"]);

    const user = mapRegisterUserCommandRequestToUser(commandRequest);

    const validationResult = validateUser(user);

    if (validationResult.length) return new ResultModel<void>(false, validationResult);

    await this.userRepository.create(user);

    return new ResultModel<void>(true);
  }
}
