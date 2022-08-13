import { PrismaService } from "../../../infra/data/prisma.service";
import { WaifuRepository } from "../../../infra/data/repositories/waifu.repository";
import { CreateWaifuCommandRequest } from "./createWaifu.command.request";
import { CreateWaifuHandler } from "./createWaifu.handler";

describe("createWaifu.handler", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    prismaService = new PrismaService();
    waifuRepository = new WaifuRepository(prismaService);
    commandHandler = new CreateWaifuHandler(waifuRepository);
  });

  let prismaService: PrismaService;
  let waifuRepository: WaifuRepository;
  let commandHandler: CreateWaifuHandler;

  const validCommandRequest = new CreateWaifuCommandRequest(
    "Asuka Langley",
    "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
    "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
    new Date(),
    "Wilhelmshaven, Lower Saxony, Germany",
    "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
  );
  const invalidCommandRequest = new CreateWaifuCommandRequest("", "", "", null, "", "");

  it("error on validate waifu", async () => {
    // arrange
    const create = jest.spyOn(WaifuRepository.prototype, "create");

    // act
    const handleResult = await commandHandler.execute(invalidCommandRequest);

    // assert
    expect(handleResult.status).toStrictEqual(false);
    expect(handleResult.errors.length).toBeGreaterThan(1);
    expect(handleResult.data).toStrictEqual(undefined);
    expect(create).toBeCalledTimes(0);
  });

  it("create waifu successfully", async () => {
    // arrange
    const create = jest.spyOn(WaifuRepository.prototype, "create");
    jest.spyOn(WaifuRepository.prototype, "create").mockImplementation(async () => null);

    // act
    const handleResult = await commandHandler.execute(validCommandRequest);

    // assert
    expect(handleResult.status).toStrictEqual(true);
    expect(handleResult.errors).toStrictEqual(null);
    expect(handleResult.data.id.length).toStrictEqual(36);
    expect(create).toBeCalledTimes(1);
  });
});
