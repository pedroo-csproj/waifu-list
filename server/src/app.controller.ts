import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateWaifuCommandRequest } from './domain/handlers/CreateWaifu/createWaifu.command.request';
import { GetWaifuByIdQueryRequest } from './domain/handlers/GetWaifuById/getWaifuById.query.request';

@Controller()
export class AppController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async testCommand(@Body() createWaifuCommandRequest: CreateWaifuCommandRequest) {
    return this.commandBus.execute(createWaifuCommandRequest);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async testQuery(@Param() getWaifuByIdQueryRequest: GetWaifuByIdQueryRequest) {
    return this.queryBus.execute(getWaifuByIdQueryRequest);
  }
}
