import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { CreateWaifuHandler } from './domain/handlers/CreateWaifu/createWaifu.handler';
import { GetWaifuByIdHandler } from './domain/handlers/GetWaifuById/getWaifuById.handler';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [CreateWaifuHandler, GetWaifuByIdHandler],
})
export class AppModule {}
