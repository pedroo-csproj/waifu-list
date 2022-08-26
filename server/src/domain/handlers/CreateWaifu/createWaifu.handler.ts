import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { ResultModel } from "crossCutting/result.model";
import { IFileProvider } from "domain/providers/file.provider";
import { IWaifuRepository } from "domain/repositories/waifu.repository";
import { validateWaifu } from "domain/validators/waifu.validator";
import { CreateWaifuCommandRequest } from "./createWaifu.command.request";
import { CreateWaifuCommandResponse } from "./createWaifu.command.response";
import { mapCreateWaifuCommandRequestToWaifu } from "./createWaifu.mapper";

@CommandHandler(CreateWaifuCommandRequest)
export class CreateWaifuHandler
  implements ICommandHandler<CreateWaifuCommandRequest, ResultModel<CreateWaifuCommandResponse>>
{
  constructor(
    @Inject("IWaifuRepository") private readonly waifuRepository: IWaifuRepository,
    @Inject("IFileProvider") private readonly fileProvider: IFileProvider,
  ) {}

  async execute(commandRequest: CreateWaifuCommandRequest): Promise<ResultModel<CreateWaifuCommandResponse>> {
    const waifu = mapCreateWaifuCommandRequestToWaifu(commandRequest);

    const validationResult = validateWaifu(waifu);

    if (validationResult.length) return new ResultModel<CreateWaifuCommandResponse>(false, validationResult);

    await this.waifuRepository.create(waifu);

    this.fileProvider.save(commandRequest.image, waifu.image);

    return new ResultModel<CreateWaifuCommandResponse>(true, null, new CreateWaifuCommandResponse(waifu.id));
  }
}
