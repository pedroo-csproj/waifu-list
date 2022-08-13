import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreateWaifuHandler } from "./domain/handlers/CreateWaifu/createWaifu.handler";
import { GetWaifuByIdHandler } from "./domain/handlers/GetWaifuById/getWaifuById.handler";
import { PrismaService } from "./infra/data/prisma.service";
import { WaifuRepository } from "./infra/data/repositories/waifu.repository";
import { WaifusController } from "./presentation/controllers/waifus.controller";

@Module({
  imports: [CqrsModule],
  controllers: [WaifusController],
  providers: [
    CreateWaifuHandler,
    GetWaifuByIdHandler,
    PrismaService,
    { provide: "IWaifuRepository", useClass: WaifuRepository },
  ],
})
export class AppModule {}
