import { ApiProperty } from "@nestjs/swagger";

export class ListWaifusQueryResponse {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @ApiProperty({
    description: "id of Waifu",
    example: "060b01d5-994d-450d-9226-e54fab5aa245",
  })
  id: string;

  @ApiProperty({
    description: "name of Waifu",
    example: "Asuka Lengley",
  })
  name: string;
}
