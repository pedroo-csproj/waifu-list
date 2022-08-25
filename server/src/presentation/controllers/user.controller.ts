import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommandBus } from "@nestjs/cqrs";
import { Response } from "express";

import { RegisterUserCommandRequest } from "../../domain/handlers/RegisterUser/registerUser.command.request";
import { ResultModel } from "../../crossCutting/result.model";

@Controller("users")
@ApiTags("users")
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("register")
  @ApiResponse({ status: 201, description: "user registered successfully." })
  @ApiResponse({ status: 400, description: "error on register user.", isArray: true })
  async register(@Body() commandRequest: RegisterUserCommandRequest, @Res() response: Response) {
    const handleResult = await this.commandBus.execute<RegisterUserCommandRequest, ResultModel<void>>(commandRequest);

    if (!handleResult.status) return response.status(400).json(handleResult.errors);

    return response.status(201).send();
  }
}
