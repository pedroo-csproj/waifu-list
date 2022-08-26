import { Injectable } from "@nestjs/common";
import * as fs from "fs";

import { IFileProvider } from "domain/providers/file.provider";

@Injectable()
export class FileProvider implements IFileProvider {
  save(base64File: string, fileName: string): void {
    fs.writeFileSync(`public/${fileName}`, base64File, { encoding: "base64" });
  }
}
