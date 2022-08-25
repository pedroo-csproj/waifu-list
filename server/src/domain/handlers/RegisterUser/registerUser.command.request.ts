import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserCommandRequest {
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
    example: "ea0e9c9c0bd7be654a3c77c7269d5659e9ffd5c79c6c1583f8fbe302863896b6",
  })
  password: string;
}
