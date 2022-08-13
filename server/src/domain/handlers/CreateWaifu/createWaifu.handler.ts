import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateWaifuCommandRequest } from './createWaifu.command.request';
import { CreateWaifuCommandResponse } from './createWaifu.command.response';

@CommandHandler(CreateWaifuCommandRequest)
export class CreateWaifuHandler implements ICommandHandler<CreateWaifuCommandRequest, CreateWaifuCommandResponse> {
  async execute(command: CreateWaifuCommandRequest): Promise<CreateWaifuCommandResponse> {
    const commandResponse: CreateWaifuCommandResponse = { id: '123' };

    return commandResponse;
  }
}
