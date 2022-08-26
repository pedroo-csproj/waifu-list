import { ApiProperty } from "@nestjs/swagger";

export class GetWaifuByIdQueryRequest {
  constructor(id: string) {
    this.id = id;
  }

  userId: string;

  @ApiProperty({
    description: "id of Waifu",
    example: "060b01d5-994d-450d-9226-e54fab5aa245",
  })
  id: string;
}
