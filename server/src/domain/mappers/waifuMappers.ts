import { Waifu } from '@prisma/client'
import { uuid } from 'uuidv4'

import { CreateWaifuDTO } from '../dtos/CreateWaifuDTO'
import { ListWaifusDTO } from '../dtos/ListWaifusDTO'

export const waifusToListWaifus = (waifus: Waifu[]): ListWaifusDTO[] => {
  const listWaifus = waifus.map(w => (new ListWaifusDTO(w.id, w.name)))

  return listWaifus
}

export const createWaifuToWaifu = (waifuDTO: CreateWaifuDTO): Waifu => {
  const waifu: Waifu = {
    id: uuid(),
    name: waifuDTO.name,
    image: waifuDTO.image
  }

  return waifu
}
