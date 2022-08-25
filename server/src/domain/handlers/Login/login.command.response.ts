import { ApiProperty } from "@nestjs/swagger";

export class LoginCommandResponse {
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @ApiProperty({
    description: "id of user",
    example: "3a99e4d0-e953-4d8c-a592-6666dfbc5534",
  })
  id: string;

  @ApiProperty({
    description: "name of user",
    example: "pedroocsproj",
  })
  name: string;
}
