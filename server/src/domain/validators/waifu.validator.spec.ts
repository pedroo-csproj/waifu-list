import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { validateWaifu } from "./waifu.validator";

describe("waifu.validator", () => {
  it("pass valid waifu", () => {
    // arrange
    const waifu: Waifu = {
      id: uuid(),
      name: "Asuka Langley",
      lore: "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
      image: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
      birthDate: new Date(),
      origin: "Wilhelmshaven, Lower Saxony, Germany",
      myAnimeListUrl: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
      createDate: new Date(),
    };

    // act
    const validationResult = validateWaifu(waifu);

    // assert
    expect(validationResult.length).toBe(0);
  });

  it("pass invalid waifu", () => {
    // arrange
    const waifu: Waifu = {
      id: "",
      name: "",
      lore: "",
      image: "",
      birthDate: null,
      origin: "",
      myAnimeListUrl: "",
      createDate: null,
    };

    // act
    const validationResult = validateWaifu(waifu);

    // assert
    expect(validationResult.length).toBe(6);
    expect(validationResult[0]).toBe("Waifu.id - Should not be empty");
    expect(validationResult[1]).toBe("Waifu.id - Should contain 36 caracters");
    expect(validationResult[2]).toBe("Waifu.name - Should not be empty");
    expect(validationResult[3]).toBe("Waifu.origin - Should not be empty");
    expect(validationResult[4]).toBe("Waifu.myAnimeListUrl - Should not be empty");
    expect(validationResult[5]).toBe("Waifu.createDate - Should not be null");
  });
});
