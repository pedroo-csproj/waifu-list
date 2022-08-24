import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class ListWaifusQueryRequest {
  constructor(quantity: number) {
    this.quantity = quantity;
  }

  @ApiProperty({
    description: "amount of Waifus to be retrivied",
    example: 15,
    minimum: 0,
  })
  @IsInt()
  @Type(() => Number)
  quantity: number;
}
