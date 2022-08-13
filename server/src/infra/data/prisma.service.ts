import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<any> {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<any> {
    this.$on("beforeExit", async (): Promise<void> => app.close());
  }
}
