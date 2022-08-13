import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateWaifuHandler } from './domain/handlers/CreateWaifu/createWaifu.handler';
import { GetWaifuByIdHandler } from './domain/handlers/GetWaifuById/getWaifuById.handler';
import { WaifusController } from './presentation/controllers/waifus.controller';

@Module({
  imports: [CqrsModule],
  controllers: [WaifusController],
  providers: [CreateWaifuHandler, GetWaifuByIdHandler],
})
export class AppModule {}
