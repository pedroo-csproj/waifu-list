import { Waifu } from "@prisma/client";

export interface IWaifuRepository {
  list(quantity: number, userId: string): Promise<Waifu[]>;
  findById(id: string, userId: string): Promise<Waifu>;
  create(waifu: Waifu): Promise<void>;
}
