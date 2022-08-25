import { ApiProperty } from "@nestjs/swagger";

export class LoginCommandRequest {
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  @ApiProperty({
    description: "name of user",
    example: "pedroocsproj",
  })
  name: string;

  @ApiProperty({
    description: "password of user",
    example: "1-_ pass ** sapp _-1",
  })
  password: string;
}
