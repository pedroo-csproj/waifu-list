import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { mapWaifuToGetWaifuByIdQueryResponse } from "./getWaifuById.mapper";

describe("getWaifuById.mapper", () => {
  it("map successfully", () => {
    // arrange
    const waifu: Waifu = {
      id: uuid(),
      userId: uuid(),
      name: "Asuka Langley",
      lore: "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
      image: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
      birthDate: new Date(),
      origin: "Wilhelmshaven, Lower Saxony, Germany",
      myAnimeListUrl: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
      createDate: new Date(),
    };

    // act
    const mappedWaifu = mapWaifuToGetWaifuByIdQueryResponse(waifu);

    // assert
    expect(mappedWaifu.name).toBe(waifu.name);
    expect(mappedWaifu.lore).toBe(waifu.lore);
    expect(mappedWaifu.birthDate).toBe(waifu.birthDate);
    expect(mappedWaifu.origin).toBe(waifu.origin);
    expect(mappedWaifu.myAnimeListUrl).toBe(waifu.myAnimeListUrl);
    expect(mappedWaifu.createDate).toBe(waifu.createDate);
  });
});
