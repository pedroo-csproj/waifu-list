import { CreateWaifuCommandRequest } from "./createWaifu.command.request";
import { mapCreateWaifuCommandRequestToWaifu } from "./createWaifu.mapper";

describe("createWaifu.mapper", () => {
  it("map successfully", () => {
    // arrange
    const commandRequest = new CreateWaifuCommandRequest(
      "Asuka Langley",
      "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
      "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
      new Date(),
      "Wilhelmshaven, Lower Saxony, Germany",
      "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
    );

    // act
    const mappedWaifu = mapCreateWaifuCommandRequestToWaifu(commandRequest);

    // assert
    expect(mappedWaifu.id).toHaveLength(36);
    expect(mappedWaifu.name).toStrictEqual(commandRequest.name);
    expect(mappedWaifu.lore).toStrictEqual(commandRequest.lore);
    expect(mappedWaifu.birthDate).toStrictEqual(commandRequest.birthDate);
    expect(mappedWaifu.origin).toStrictEqual(commandRequest.origin);
    expect(mappedWaifu.myAnimeListUrl).toStrictEqual(commandRequest.myAnimeListUrl);
  });
});
