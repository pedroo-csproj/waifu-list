import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { PrismaService } from "../../../infra/data/prisma.service";
import { WaifuRepository } from "../../../infra/data/repositories/waifu.repository";
import { ListWaifusHandler } from "./listWaifus.handler";
import { ListWaifusQueryRequest } from "./listWaifus.query.request";
import { ListWaifusQueryResponse } from "./listWaifus.query.response";

describe("listWaifus.handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    prismaService = new PrismaService();
    waifuRepository = new WaifuRepository(prismaService);
    queryHandler = new ListWaifusHandler(waifuRepository);
  });

  let prismaService: PrismaService;
  let waifuRepository: WaifuRepository;
  let queryHandler: ListWaifusHandler;

  it("list waifus successfully", async () => {
    // arrange
    const queryRequest = new ListWaifusQueryRequest(2);
    const waifus: Waifu[] = [
      {
        id: uuid(),
        userId: uuid(),
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
        userId: uuid(),
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

    jest.spyOn(WaifuRepository.prototype, "list").mockImplementation(async () => waifus);

    // act
    const handleResult = await queryHandler.execute(queryRequest);

    // assert
    expect(handleResult.status).toBe(true);
    expect(handleResult.errors).toBe(null);

    const expectedQueryResponse: ListWaifusQueryResponse[] = [
      {
        id: waifus[0].id,
        name: waifus[0].name,
      },
      {
        id: waifus[1].id,
        name: waifus[1].name,
      },
    ];
    expect(handleResult.data).toEqual(expectedQueryResponse);
  });
});
