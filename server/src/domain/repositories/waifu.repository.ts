import { Waifu } from "@prisma/client";

export interface IWaifuRepository {
  findById(id: string): Promise<Waifu>;
  create(waifu: Waifu): Promise<void>;
}
