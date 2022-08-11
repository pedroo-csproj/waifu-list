import { Waifu } from '@prisma/client'

import { IWaifuRepository } from '../../../domain/repositories/IWaifuRepository'
import { PrismaService } from '../prismaService'

export class WaifuRepository implements IWaifuRepository {
  constructor (private prismaService: PrismaService) { }

  async list (): Promise<Waifu[]> {
    return await this.prismaService.waifu.findMany()
  }

  async findById (id: string): Promise<Waifu> {
    return await this.prismaService.waifu.findFirst({ where: { id } })
  }

  async create (waifu: Waifu): Promise<void> {
    await this.prismaService.waifu.create({ data: waifu })
  }

  async update (waifu: Waifu): Promise<void> {
    await this.prismaService.waifu.update({ where: { id: waifu.id }, data: waifu })
  }

  async delete (id: string): Promise<void> {
    await this.prismaService.waifu.delete({ where: { id } })
  }
}
