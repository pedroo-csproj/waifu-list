import { Waifu } from ".prisma/client";
import { Injectable } from "@nestjs/common";

import { IWaifuRepository } from "src/domain/repositories/waifu.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WaifuRepository implements IWaifuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<Waifu> {
    return await this.prismaService.waifu.findFirst({ where: { id } });
  }

  async create(waifu: Waifu): Promise<void> {
    await this.prismaService.waifu.create({ data: waifu });
  }
}
