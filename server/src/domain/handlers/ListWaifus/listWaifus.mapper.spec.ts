import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { mapWaifusToListWaifusQueryResponse } from "./listWaifus.mapper";

describe("listWaifus.mapper", () => {
  it("map successfully", () => {
    // arrange
    const waifus: Waifu[] = [
      {
        id: uuid(),
        name: "Asuka Langley",
        lore: "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
        image: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
        birthDate: new Date(),
        origin: "Wilhelmshaven, Lower Saxony, Germany",
        myAnimeListUrl: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
        createDate: new Date(),
      },
      {
        id: uuid(),
        name: "Tomoyo Daidouji",
        lore: "Tomoyo, Madison Taylor in the English dub, is the best friend of the series heroine, Sakura Kinomoto. When she discovers that Sakura has become the Cardcaptor, she becomes Sakura's primary assistant by designing 'battle costumes' and filming all of her magical (and non-magical) endeavours.",
        image:
          "https://cdn.myanimelist.net/images/characters/7/55687.jpg?_gl=1*1epc0sa*_ga*MTUyODg1NzQ1Ny4xNjUzNTA3MjQ4*_ga_26FEP9527K*MTY2MTIwNjE5MC40NS4xLjE2NjEyMDYyNjAuNjAuMC4w",
        birthDate: new Date(),
        origin: "Japan",
        myAnimeListUrl: "https://myanimelist.net/character/3120/Tomoyo_Daidouji",
        createDate: new Date(),
      },
    ];

    // act
    const mappedWaifus = mapWaifusToListWaifusQueryResponse(waifus);

    // assert
    expect(mappedWaifus.length).toBe(2);

    expect(mappedWaifus[0].id).toBe(waifus[0].id);
    expect(mappedWaifus[0].name).toBe(waifus[0].name);

    expect(mappedWaifus[1].id).toBe(waifus[1].id);
    expect(mappedWaifus[1].name).toBe(waifus[1].name);
  });
});
