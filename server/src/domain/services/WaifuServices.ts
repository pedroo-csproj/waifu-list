import { CreateWaifuDTO } from '../dtos/CreateWaifuDTO'
import { ListWaifusDTO } from '../dtos/ListWaifusDTO'
import { createWaifuToWaifu, waifusToListWaifus } from '../mappers/waifuMappers'
import { IWaifuRepository } from '../repositories/IWaifuRepository'

export class WaifuServices {
  constructor (private readonly waifuRepository: IWaifuRepository) { }

  async list (): Promise<ListWaifusDTO[]> {
    const waifus = await this.waifuRepository.list()

    const listWaifus = waifusToListWaifus(waifus)

    return listWaifus
  }

  async create (waifuDTO: CreateWaifuDTO): Promise<string> {
    const waifu = createWaifuToWaifu(waifuDTO)

    await this.waifuRepository.create(waifu)

    return waifu.id
  }
}
