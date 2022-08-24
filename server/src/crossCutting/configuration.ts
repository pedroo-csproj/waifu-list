import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Configuration {
  constructor(private readonly configService: ConfigService) {
    this.port = configService.get<number>("API_PORT");
  }

  port: number;
}
