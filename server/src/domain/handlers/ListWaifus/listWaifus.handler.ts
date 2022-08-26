import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { ResultModel } from "../../../crossCutting/result.model";
import { IWaifuRepository } from "../../repositories/waifu.repository";
import { mapWaifusToListWaifusQueryResponse } from "./listWaifus.mapper";
import { ListWaifusQueryRequest } from "./listWaifus.query.request";
import { ListWaifusQueryResponse } from "./listWaifus.query.response";

@QueryHandler(ListWaifusQueryRequest)
export class ListWaifusHandler
  implements IQueryHandler<ListWaifusQueryRequest, ResultModel<ListWaifusQueryResponse[]>>
{
  constructor(@Inject("IWaifuRepository") private readonly waifuRepository: IWaifuRepository) {}

  async execute(queryRequest: ListWaifusQueryRequest): Promise<ResultModel<ListWaifusQueryResponse[]>> {
    const waifus = await this.waifuRepository.list(queryRequest.quantity, queryRequest.userId);

    const queryResponse = mapWaifusToListWaifusQueryResponse(waifus);

    return new ResultModel<ListWaifusQueryResponse[]>(true, null, queryResponse);
  }
}
