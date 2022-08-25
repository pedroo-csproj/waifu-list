import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { ResultModel } from "../../crossCutting/result.model";
import { LoginCommandRequest } from "../../domain/handlers/Login/login.command.request";
import { LoginCommandResponse } from "../../domain/handlers/Login/login.command.response";

@Controller("auth")
@ApiTags("auth")
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private readonly jwtService: JwtService, private readonly commandBus: CommandBus) {}

  @Post("login")
  @ApiResponse({ status: 200, description: "login successfully." })
  @ApiResponse({ status: 400, description: "error on login." })
  async login(@Body() commandRequest: LoginCommandRequest, @Res() response: Response) {
    const handleResult = await this.commandBus.execute<LoginCommandRequest, ResultModel<LoginCommandResponse>>(
      commandRequest,
    );

    if (!handleResult.status) return response.status(400).json(handleResult.errors);

    return response.status(200).json(this.jwtService.sign({ id: handleResult.data.id, name: handleResult.data.name }));
  }
}
