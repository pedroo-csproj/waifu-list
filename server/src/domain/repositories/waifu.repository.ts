import { Waifu } from "@prisma/client";

export interface IWaifuRepository {
  list(quantity: number): Promise<Waifu[]>;
  findById(id: string): Promise<Waifu>;
  create(waifu: Waifu): Promise<void>;
}
