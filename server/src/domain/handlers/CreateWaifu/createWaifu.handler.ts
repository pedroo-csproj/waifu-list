import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateWaifuCommandRequest } from "./createWaifu.command.request";
import { CreateWaifuCommandResponse } from "./createWaifu.command.response";
import { mapCreateWaifuCommandRequestToWaifu } from "src/domain/mappers/waifu.mapper";
import { IWaifuRepository } from "src/domain/repositories/waifu.repository";
import { ResultModel } from "src/crossCutting/result.model";
import { validateWaifu } from "src/domain/validators/waifu.validator";

@CommandHandler(CreateWaifuCommandRequest)
export class CreateWaifuHandler
  implements ICommandHandler<CreateWaifuCommandRequest, ResultModel<CreateWaifuCommandResponse>>
{
  constructor(@Inject("IWaifuRepository") private readonly waifuRepository: IWaifuRepository) {}

  async execute(commandRequest: CreateWaifuCommandRequest): Promise<ResultModel<CreateWaifuCommandResponse>> {
    const waifu = mapCreateWaifuCommandRequestToWaifu(commandRequest);

    const validationResult = validateWaifu(waifu);

    if (validationResult.length) return new ResultModel<CreateWaifuCommandResponse>(false, validationResult);

    await this.waifuRepository.create(waifu);

    return new ResultModel<CreateWaifuCommandResponse>(true, null, new CreateWaifuCommandResponse(waifu.id));
  }
}
