import { Waifu } from '@prisma/client'
import { uuid } from 'uuidv4'

import { UpdateWaifuDTO } from '../dtos/UpdateWaifuDTO'
import { CreateWaifuDTO } from '../dtos/CreateWaifuDTO'
import { ListWaifusDTO } from '../dtos/ListWaifusDTO'
import { FindWaifuByIdDTO } from '../dtos/FindWaifuByIdDTO'

export const waifusToListWaifus = (waifus: Waifu[]): ListWaifusDTO[] => {
  const listWaifus = waifus.map(w => (new ListWaifusDTO(w.id, w.name)))

  return listWaifus
}

export const waifuToFindWaifuById = (waifu: Waifu): FindWaifuByIdDTO => {
  const findWaifu = new FindWaifuByIdDTO(waifu.name, waifu.image)

  return findWaifu
}

export const createWaifuToWaifu = (waifuDTO: CreateWaifuDTO): Waifu => {
  const waifu: Waifu = {
    id: uuid(),
    name: waifuDTO.name,
    image: waifuDTO.image
  }

  return waifu
}

export const updateWaifuToWaifu = (waifuDTO: UpdateWaifuDTO): Waifu => {
  const waifu: Waifu = {
    id: waifuDTO.id,
    name: waifuDTO.name,
    image: waifuDTO.image
  }

  return waifu
}
