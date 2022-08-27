import { ELevel } from "domain/enums/level.enum";

export interface ILogProvider {
  log(level: ELevel, message: string): Promise<void>;
}
