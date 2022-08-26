import { User } from ".prisma/client";
import { Injectable } from "@nestjs/common";

import { IUserRepository } from "domain/repositories/user.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async getByName(name: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { name } });
  }

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({ data: user });
  }
}
