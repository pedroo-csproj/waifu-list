import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";

import { CreateWaifuCommandRequest } from "./createWaifu.command.request";
import { CreateWaifuCommandResponse } from "./createWaifu.command.response";
import { IWaifuRepository } from "../../repositories/waifu.repository";
import { ResultModel } from "../../../crossCutting/result.model";
import { validateWaifu } from "../../validators/waifu.validator";
import { mapCreateWaifuCommandRequestToWaifu } from "./createWaifu.mapper";

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
