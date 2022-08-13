import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateWaifuCommandRequest } from 'src/domain/handlers/CreateWaifu/createWaifu.command.request';
import { GetWaifuByIdQueryRequest } from 'src/domain/handlers/GetWaifuById/getWaifuById.query.request';

@Controller('waifus')
@ApiTags('waifus')
@UsePipes(new ValidationPipe({ transform: true }))
export class WaifusController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  async create(@Body() createWaifuCommandRequest: CreateWaifuCommandRequest) {
    return this.commandBus.execute(createWaifuCommandRequest);
  }

  @Get(':id')
  async getById(@Param() getWaifuByIdQueryRequest: GetWaifuByIdQueryRequest) {
    return this.queryBus.execute(getWaifuByIdQueryRequest);
  }
}
