import { FindWaifuByIdDTO } from '../dtos/FindWaifuByIdDTO'
import { UpdateWaifuDTO } from '../dtos/UpdateWaifuDTO'
import { CreateWaifuDTO } from '../dtos/CreateWaifuDTO'
import { ListWaifusDTO } from '../dtos/ListWaifusDTO'
import { createWaifuToWaifu, updateWaifuToWaifu, waifusToListWaifus, waifuToFindWaifuById } from '../mappers/waifuMappers'
import { IWaifuRepository } from '../repositories/IWaifuRepository'

export class WaifuServices {
  constructor (private readonly waifuRepository: IWaifuRepository) { }

  async list (): Promise<ListWaifusDTO[]> {
    const waifus = await this.waifuRepository.list()

    const listWaifus = waifusToListWaifus(waifus)

    return listWaifus
  }

  async findById (id: string): Promise<FindWaifuByIdDTO> {
    const waifu = await this.waifuRepository.findById(id)

    const waifuDTO = waifuToFindWaifuById(waifu)

    return waifuDTO
  }

  async create (waifuDTO: CreateWaifuDTO): Promise<string> {
    const waifu = createWaifuToWaifu(waifuDTO)

    await this.waifuRepository.create(waifu)

    return waifu.id
  }

  async update (waifuDTO: UpdateWaifuDTO): Promise<void> {
    if (await this.waifuRepository.findById(waifuDTO.id) === null) {
      return null
    }

    const waifu = updateWaifuToWaifu(waifuDTO)

    await this.waifuRepository.update(waifu)
  }

  async delete (id: string): Promise<void> {
    if (await this.waifuRepository.findById(id) === null) {
      return null
    }

    await this.waifuRepository.delete(id)
  }
}
