import { Body, Controller, Get, Param, Post, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { ResultModel } from "../../crossCutting/result.model";
import { CreateWaifuCommandRequest } from "../../domain/handlers/CreateWaifu/createWaifu.command.request";
import { CreateWaifuCommandResponse } from "../../domain/handlers/CreateWaifu/createWaifu.command.response";
import { GetWaifuByIdQueryRequest } from "../../domain/handlers/GetWaifuById/getWaifuById.query.request";
import { GetWaifuByIdQueryResponse } from "../../domain/handlers/GetWaifuById/getWaifuById.query.response";
import { ListWaifusQueryRequest } from "../../domain/handlers/ListWaifus/listWaifus.query.request";
import { ListWaifusQueryResponse } from "../../domain/handlers/ListWaifus/listWaifus.query.response";

@Controller("waifus")
@ApiTags("waifus")
@UsePipes(new ValidationPipe({ transform: true }))
export class WaifusController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "waifus retrivied successfully.",
    type: ListWaifusQueryResponse,
    isArray: true,
  })
  async list(@Query() queryRequest: ListWaifusQueryRequest, @Res() response: Response) {
    const handleResult = await this.queryBus.execute<ListWaifusQueryRequest, ResultModel<ListWaifusQueryResponse[]>>(
      queryRequest,
    );

    return response.status(200).json(handleResult.data);
  }

  @Get("/:id")
  @ApiResponse({ status: 200, description: "waifu retrivied successfully", type: GetWaifuByIdQueryResponse })
  @ApiResponse({ status: 404, description: "error on retrive waifu", isArray: true })
  async getById(@Param() queryRequest: GetWaifuByIdQueryRequest, @Res() response: Response) {
    const handleResult = await this.queryBus.execute<GetWaifuByIdQueryRequest, ResultModel<GetWaifuByIdQueryResponse>>(
      queryRequest,
    );

    if (!handleResult.status) return response.status(404).json(handleResult.errors);

    return response.status(200).json(handleResult.data);
  }

  @Post()
  @ApiResponse({ status: 201, description: "waifu created successfully.", type: CreateWaifuCommandResponse })
  @ApiResponse({ status: 400, description: "error on create waifu.", isArray: true })
  async create(@Body() commandRequest: CreateWaifuCommandRequest, @Res() response: Response) {
    const handleResult = await this.commandBus.execute<
      CreateWaifuCommandRequest,
      ResultModel<CreateWaifuCommandResponse>
    >(commandRequest);

    if (!handleResult.status) return response.status(400).json(handleResult.errors);

    return response.status(201).json(handleResult.data);
  }
}
