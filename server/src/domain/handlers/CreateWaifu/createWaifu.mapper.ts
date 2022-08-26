import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { CreateWaifuCommandRequest } from "./createWaifu.command.request";

export function mapCreateWaifuCommandRequestToWaifu(commandRequest: CreateWaifuCommandRequest): Waifu {
  const waifu: Waifu = {
    id: uuid(),
    userId: commandRequest.userId,
    name: commandRequest.name,
    lore: commandRequest.lore,
    image: `${uuid()}.jpg`,
    birthDate: commandRequest.birthDate,
    origin: commandRequest.origin,
    myAnimeListUrl: commandRequest.myAnimeListUrl,
    createDate: new Date(),
  };

  return waifu;
}
