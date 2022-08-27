import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";

import { CreateWaifuHandler } from "domain/handlers/CreateWaifu/createWaifu.handler";
import { GetWaifuByIdHandler } from "domain/handlers/GetWaifuById/getWaifuById.handler";
import { ListWaifusHandler } from "domain/handlers/ListWaifus/listWaifus.handler";
import { LoginHandler } from "domain/handlers/Login/login.handler";
import { RegisterUserHandler } from "domain/handlers/RegisterUser/registerUser.handler";
import { PrismaService } from "infra/data/prisma.service";
import { FileProvider } from "infra/data/providers/file.provider";
import { UserRepository } from "infra/data/repositories/user.repository";
import { WaifuRepository } from "infra/data/repositories/waifu.repository";
import { LogProvider } from "infra/providers/log/log.provider";
import { Log, LogSchema } from "infra/providers/log/log.schema";
import { AuthController } from "presentation/controllers/auth.controller";
import { UsersController } from "presentation/controllers/user.controller";
import { WaifusController } from "presentation/controllers/waifus.controller";
import { JwtStrategy } from "presentation/strategies/jwt.strategy";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_DB_URL"),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_SECRET"),
          signOptions: {
            expiresIn: "1h",
          },
        };
      },
    }),
  ],
  controllers: [UsersController, WaifusController, AuthController],
  providers: [
    LoginHandler,
    CreateWaifuHandler,
    GetWaifuByIdHandler,
    ListWaifusHandler,
    RegisterUserHandler,
    PrismaService,
    PassportModule,
    JwtStrategy,
    { provide: "IWaifuRepository", useClass: WaifuRepository },
    { provide: "IUserRepository", useClass: UserRepository },
    { provide: "IFileProvider", useClass: FileProvider },
    { provide: "ILogProvider", useClass: LogProvider },
  ],
})
export class AppModule {}
