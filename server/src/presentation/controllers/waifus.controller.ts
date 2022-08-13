import { Body, Controller, Get, Param, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { ResultModel } from "src/crossCutting/result.model";
import { CreateWaifuCommandRequest } from "src/domain/handlers/CreateWaifu/createWaifu.command.request";
import { CreateWaifuCommandResponse } from "src/domain/handlers/CreateWaifu/createWaifu.command.response";
import { GetWaifuByIdQueryRequest } from "src/domain/handlers/GetWaifuById/getWaifuById.query.request";
import { GetWaifuByIdQueryResponse } from "src/domain/handlers/GetWaifuById/getWaifuById.query.response";

@Controller("waifus")
@ApiTags("waifus")
@UsePipes(new ValidationPipe({ transform: true }))
export class WaifusController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get("/:id")
  async getById(@Param() queryRequest: GetWaifuByIdQueryRequest, @Res() response: Response) {
    const handleResult = await this.queryBus.execute<GetWaifuByIdQueryRequest, ResultModel<GetWaifuByIdQueryResponse>>(
      queryRequest,
    );

    if (!handleResult.status) return response.status(404).json(handleResult.errors);

    return response.status(200).json(handleResult.data);
  }

  @Post()
  async create(@Body() commandRequest: CreateWaifuCommandRequest, @Res() response: Response) {
    const handleResult = await this.commandBus.execute<
      CreateWaifuCommandRequest,
      ResultModel<CreateWaifuCommandResponse>
    >(commandRequest);

    if (!handleResult.status) return response.status(400).json(handleResult.errors);

    return response.status(201).json(handleResult.data);
  }
}
