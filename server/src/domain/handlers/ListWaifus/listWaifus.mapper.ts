import { Waifu } from "@prisma/client";

import { ListWaifusQueryResponse } from "./listWaifus.query.response";

export function mapWaifusToListWaifusQueryResponse(waifus: Waifu[]): ListWaifusQueryResponse[] {
  const queryResponse = waifus.map((w) => new ListWaifusQueryResponse(w.id, w.name));

  return queryResponse;
}
