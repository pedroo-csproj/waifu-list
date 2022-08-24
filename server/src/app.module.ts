import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreateWaifuHandler } from "./domain/handlers/CreateWaifu/createWaifu.handler";
import { GetWaifuByIdHandler } from "./domain/handlers/GetWaifuById/getWaifuById.handler";
import { ListWaifusHandler } from "./domain/handlers/ListWaifus/listWaifus.handler";
import { PrismaService } from "./infra/data/prisma.service";
import { FileProvider } from "./infra/data/providers/file.provider";
import { WaifuRepository } from "./infra/data/repositories/waifu.repository";
import { WaifusController } from "./presentation/controllers/waifus.controller";

@Module({
  imports: [CqrsModule],
  controllers: [WaifusController],
  providers: [
    CreateWaifuHandler,
    GetWaifuByIdHandler,
    ListWaifusHandler,
    PrismaService,
    { provide: "IWaifuRepository", useClass: WaifuRepository },
    { provide: "IFileProvider", useClass: FileProvider },
  ],
})
export class AppModule {}
