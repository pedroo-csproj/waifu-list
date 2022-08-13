import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetWaifuByIdQueryRequest } from './getWaifuById.query.request';
import { GetWaifuByIdQueryResponse } from './getWaifuById.query.response';

@QueryHandler(GetWaifuByIdQueryRequest)
export class GetWaifuByIdHandler implements IQueryHandler<GetWaifuByIdQueryRequest, GetWaifuByIdQueryResponse> {
  async execute(query: GetWaifuByIdQueryRequest): Promise<GetWaifuByIdQueryResponse> {
    return new GetWaifuByIdQueryResponse('Asukaaaas');
  }
}
