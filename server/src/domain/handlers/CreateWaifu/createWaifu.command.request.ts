import { ApiProperty } from "@nestjs/swagger";

export class CreateWaifuCommandRequest {
  constructor(name: string, lore: string, image: string, birthDate: Date, origin: string, myAnimeListUrl: string) {
    this.name = name;
    this.lore = lore;
    this.image = image;
    this.birthDate = birthDate;
    this.origin = origin;
    this.myAnimeListUrl = myAnimeListUrl;
  }

  userId: string;

  @ApiProperty({
    description: "name of Waifu",
    example: "Asuka Lengley",
  })
  name: string;

  @ApiProperty({
    description: "lore of Waifu",
    example:
      "Asuka is the Second Child , who pilots Evangelion Unit 02. She is from Germany, but with an American father and a half-German, half-Japanese mother. In the Rebuild of Evangelion series of movies, her name is changed to Asuka Langley Shikinami.",
  })
  lore: string;

  @ApiProperty({
    description: "image of Waifu",
  })
  image: string;

  @ApiProperty({
    description: "birth date of Waifu",
    example: new Date(),
  })
  birthDate: Date;

  @ApiProperty({
    description: "location that Waifu birth",
    example: "Wilhelmshaven, Lower Saxony, Germany",
  })
  origin: string;

  @ApiProperty({
    description: "Waifus myanimelist url",
    example: "https://myanimelist.net/character/94/Asuka_Langley_Souryuu",
  })
  myAnimeListUrl: string;
}
