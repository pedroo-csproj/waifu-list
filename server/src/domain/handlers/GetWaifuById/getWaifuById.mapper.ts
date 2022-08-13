import { Waifu } from "@prisma/client";

import { GetWaifuByIdQueryResponse } from "./getWaifuById.query.response";

export function mapWaifuToGetWaifuByIdQueryResponse(waifu: Waifu): GetWaifuByIdQueryResponse {
  const queryResponse = new GetWaifuByIdQueryResponse(
    waifu.name,
    waifu.lore,
    waifu.image,
    waifu.birthDate,
    waifu.origin,
    waifu.myAnimeListUrl,
    waifu.createDate,
  );

  return queryResponse;
}
