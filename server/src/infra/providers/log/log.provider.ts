import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ELevel } from "domain/enums/level.enum";
import { ILogProvider } from "domain/providers/log.provider";
import { Log, LogDocument } from "./log.schema";

@Injectable()
export class LogProvider implements ILogProvider {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}

  async log(level: ELevel, message: string): Promise<void> {
    const log: Log = { level, message, createDate: new Date() };
    const newlog = new this.logModel(log);
    await newlog.save();
  }
}
