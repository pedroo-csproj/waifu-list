import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ELevel } from "domain/enums/level.enum";

@Schema()
export class Log {
  @Prop({
    enum: ELevel,
    default: ELevel.info,
    required: true,
  })
  level: ELevel;

  @Prop({ required: true })
  message: string;

  @Prop({
    required: true,
    default: new Date(),
  })
  createDate: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
