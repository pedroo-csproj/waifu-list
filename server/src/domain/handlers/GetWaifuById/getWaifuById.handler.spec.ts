import { Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { PrismaService } from "../../../infra/data/prisma.service";
import { WaifuRepository } from "../../../infra/data/repositories/waifu.repository";
import { GetWaifuByIdHandler } from "./getWaifuById.handler";
import { GetWaifuByIdQueryRequest } from "./getWaifuById.query.request";

describe("getWaifuById.handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    prismaService = new PrismaService();
    waifuRepository = new WaifuRepository(prismaService);
    queryHandler = new GetWaifuByIdHandler(waifuRepository);
  });

  let prismaService: PrismaService;
  let waifuRepository: WaifuRepository;
  let queryHandler: GetWaifuByIdHandler;

  it("waifu doens't found", async () => {
    // arrange
    jest.spyOn(WaifuRepository.prototype, "findById").mockImplementation(async () => null);
    const queryRequest = new GetWaifuByIdQueryRequest(uuid());

    // act
    const handleResult = await queryHandler.execute(queryRequest);

    // assert
    expect(handleResult.status).toStrictEqual(false);
    expect(handleResult.errors).toStrictEqual(["waifu doens't exists"]);
    expect(handleResult.data).toStrictEqual(undefined);
  });

  it("get waifu successfully", async () => {
    // arrange
    jest.spyOn(WaifuRepository.prototype, "findById").mockImplementation(async () => waifu);
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
    const queryRequest = new GetWaifuByIdQueryRequest(uuid());

    // act
    const handleResult = await queryHandler.execute(queryRequest);

    // assert
    expect(handleResult.status).toStrictEqual(true);
    expect(handleResult.errors).toStrictEqual(null);
    expect(handleResult.data.name).toStrictEqual(waifu.name);
    expect(handleResult.data.lore).toStrictEqual(waifu.lore);
    expect(handleResult.data.image).toStrictEqual(waifu.image);
    expect(handleResult.data.birthDate).toStrictEqual(waifu.birthDate);
    expect(handleResult.data.origin).toStrictEqual(waifu.origin);
    expect(handleResult.data.myAnimeListUrl).toStrictEqual(waifu.myAnimeListUrl);
    expect(handleResult.data.createDate).toStrictEqual(waifu.createDate);
  });
});
