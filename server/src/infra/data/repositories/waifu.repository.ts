import { Waifu } from ".prisma/client";
import { Injectable } from "@nestjs/common";

import { IWaifuRepository } from "domain/repositories/waifu.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WaifuRepository implements IWaifuRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async list(quantity: number, userId: string): Promise<Waifu[]> {
    return await this.prismaService.waifu.findMany({ where: { userId }, take: quantity });
  }

  async findById(id: string, userId: string): Promise<Waifu> {
    return await this.prismaService.waifu.findFirst({ where: { id, userId } });
  }

  async create(waifu: Waifu): Promise<void> {
    await this.prismaService.waifu.create({ data: waifu });
  }
}
