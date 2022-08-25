import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";

import { Configuration } from "./crossCutting/configuration";
import { CreateWaifuHandler } from "./domain/handlers/CreateWaifu/createWaifu.handler";
import { GetWaifuByIdHandler } from "./domain/handlers/GetWaifuById/getWaifuById.handler";
import { ListWaifusHandler } from "./domain/handlers/ListWaifus/listWaifus.handler";
import { RegisterUserHandler } from "./domain/handlers/RegisterUser/registerUser.handler";
import { PrismaService } from "./infra/data/prisma.service";
import { FileProvider } from "./infra/data/providers/file.provider";
import { UserRepository } from "./infra/data/repositories/user.repository";
import { WaifuRepository } from "./infra/data/repositories/waifu.repository";
import { UsersController } from "./presentation/controllers/user.controller";
import { WaifusController } from "./presentation/controllers/waifus.controller";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CqrsModule],
  controllers: [UsersController, WaifusController],
  providers: [
    CreateWaifuHandler,
    GetWaifuByIdHandler,
    ListWaifusHandler,
    RegisterUserHandler,
    PrismaService,
    Configuration,
    { provide: "IWaifuRepository", useClass: WaifuRepository },
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "IFileProvider", useClass: FileProvider },
  ],
})
export class AppModule {}
