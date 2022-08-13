import { ApiProperty } from '@nestjs/swagger';

export class CreateWaifuCommandRequest {
  constructor(name: string) {
    this.name = name;
  }

  @ApiProperty({
    description: 'name of waifu',
    example: 'Asuka Lengley',
  })
  name: string;
}
