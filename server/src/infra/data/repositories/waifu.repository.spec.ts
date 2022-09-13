import { faker } from "@faker-js/faker";
import { User, Waifu } from "@prisma/client";
import { uuid } from "uuidv4";

import { PrismaService } from "../prisma.service";
import { WaifuRepository } from "./waifu.repository";

describe("waifu.repository", () => {
  beforeAll(() => {
    prismaService = new PrismaService();
    waifuRepository = new WaifuRepository(prismaService);
  });

  afterAll(async () => await prismaService.$disconnect());

  let prismaService: PrismaService;
  let waifuRepository: WaifuRepository;

  describe("list", () => {
    beforeAll(async () => {
      user = {
        id: uuid(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
        createDate: new Date(),
      };

      await prismaService.user.create({ data: user });

      waifus = [
        {
          id: uuid(),
          userId: user.id,
          name: "Asuka Langley",
          lore: "Tomoyo, Madison Taylor in the English dub, is the best friend of the series heroine, Sakura Kinomoto. When she discovers that Sakura has become the Cardcaptor, she becomes Sakura's primary assistant by designing 'battle costumes' and filming all of her magical (and non-magical) endeavours.",
          image: "asuka.png",
          birthDate: faker.date.birthdate(),
          origin: "Germany",
          myAnimeListUrl: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
          createDate: new Date("2021-09-13T22:56:03.655Z"),
        },
        {
          id: uuid(),
          userId: user.id,
          name: "Chisato Nishikigi",
          lore: "Said to be the strongest Lycoris of all time. She enjoys solving private-sector problems that the DA would not address. At Café LycoReco, she works joyfully and cheerfully as the self-proclaimed poster girl.",
          image: "chisato.png",
          birthDate: faker.date.birthdate(),
          origin: "Japan",
          myAnimeListUrl: "https://myanimelist.net/character/204621/Chisato_Nishikigi",
          createDate: new Date("2022-09-13T22:56:03.655Z"),
        },
      ];

      await prismaService.waifu.createMany({ data: waifus });
    });

    afterAll(async () => waifus.forEach(async (w) => await prismaService.waifu.delete({ where: { id: w.id } })));

    let user: User;
    let waifus: Waifu[];

    test("list with a valid userId", async () => {
      // arrange & act
      const listWaifusResult = (await waifuRepository.list(10, user.id)).sort(
        (waifuA, waifuB) => waifuA.createDate.getTime() - waifuB.createDate.getTime(),
      );

      // assert
      expect(listWaifusResult).toStrictEqual(waifus);
    });

    test("list with a invalid userId", async () => {
      // arrange & act
      const listWaifusResult = (await waifuRepository.list(10, uuid())).sort(
        (waifuA, waifuB) => waifuA.createDate.getTime() - waifuB.createDate.getTime(),
      );

      // assert
      expect(listWaifusResult).not.toStrictEqual(waifus);
      expect(listWaifusResult.length).toBe(0);
    });

    test("list the correct quantity", async () => {
      // arrange & act
      const listWaifusResult = (await waifuRepository.list(1, user.id)).sort(
        (waifuA, waifuB) => waifuA.createDate.getTime() - waifuB.createDate.getTime(),
      );

      // assert
      expect(listWaifusResult[0]).toStrictEqual(waifus[1]);
      expect(listWaifusResult.length).toBe(1);
    });
  });
});
