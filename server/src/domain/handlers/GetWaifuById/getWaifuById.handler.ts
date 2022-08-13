import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { ResultModel } from "src/crossCutting/result.model";
import { IWaifuRepository } from "src/domain/repositories/waifu.repository";
import { mapWaifuToGetWaifuByIdQueryResponse } from "./getWaifuById.mapper";
import { GetWaifuByIdQueryRequest } from "./getWaifuById.query.request";
import { GetWaifuByIdQueryResponse } from "./getWaifuById.query.response";

@QueryHandler(GetWaifuByIdQueryRequest)
export class GetWaifuByIdHandler
  implements IQueryHandler<GetWaifuByIdQueryRequest, ResultModel<GetWaifuByIdQueryResponse>>
{
  constructor(@Inject("IWaifuRepository") private readonly waifuRepository: IWaifuRepository) {}

  async execute(queryRequest: GetWaifuByIdQueryRequest): Promise<ResultModel<GetWaifuByIdQueryResponse>> {
    const waifu = await this.waifuRepository.findById(queryRequest.id);

    if (waifu === null) return new ResultModel<GetWaifuByIdQueryResponse>(false, ["waifu doens't exists"]);

    const queryResponse = mapWaifuToGetWaifuByIdQueryResponse(waifu);

    return new ResultModel<GetWaifuByIdQueryResponse>(true, null, queryResponse);
  }
}
