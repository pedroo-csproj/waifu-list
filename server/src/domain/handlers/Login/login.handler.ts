import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { ResultModel } from "../../../crossCutting/result.model";
import { comparePasswords } from "../../helpers/password.helper";
import { IUserRepository } from "../../repositories/user.repository";
import { LoginCommandRequest } from "./login.command.request";
import { LoginCommandResponse } from "./login.command.response";

@CommandHandler(LoginCommandRequest)
export class LoginHandler implements ICommandHandler<LoginCommandRequest, ResultModel<LoginCommandResponse>> {
  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository) {}

  async execute(commandRequest: LoginCommandRequest): Promise<ResultModel<LoginCommandResponse>> {
    const user = await this.userRepository.getByName(commandRequest.name);

    if (!user) return new ResultModel<LoginCommandResponse>(false, ["name or password are incorrect"]);

    if (!comparePasswords(commandRequest.password, user.password))
      return new ResultModel<LoginCommandResponse>(false, ["name or password are incorrect"]);

    const commandResponse = new LoginCommandResponse(user.id, user.name);

    return new ResultModel<LoginCommandResponse>(true, null, commandResponse);
  }
}
