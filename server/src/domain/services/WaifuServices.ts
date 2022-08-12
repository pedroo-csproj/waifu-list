import { FindWaifuByIdDTO } from '../dtos/FindWaifuByIdDTO'
import { UpdateWaifuDTO } from '../dtos/UpdateWaifuDTO'
import { CreateWaifuDTO } from '../dtos/CreateWaifuDTO'
import { ListWaifusDTO } from '../dtos/ListWaifusDTO'
import { createWaifuToWaifu, updateWaifuToWaifu, waifusToListWaifus, waifuToFindWaifuById } from '../mappers/waifuMappers'
import { IWaifuRepository } from '../repositories/IWaifuRepository'
import { ResultModel } from '../../crossCutting/ResultModel'

export class WaifuServices {
  constructor (private readonly waifuRepository: IWaifuRepository) { }

  async list (): Promise<ResultModel<ListWaifusDTO[]>> {
    const waifus = await this.waifuRepository.list()

    const listWaifus = waifusToListWaifus(waifus)

    return new ResultModel(true, null, listWaifus)
  }

  async findById (id: string): Promise<ResultModel<FindWaifuByIdDTO>> {
    const waifu = await this.waifuRepository.findById(id)

    if (waifu === null) {
      return new ResultModel(false, ['waifu doens\'t exists'])
    }

    const waifuDTO = waifuToFindWaifuById(waifu)

    return new ResultModel(true, null, waifuDTO)
  }

  async create (waifuDTO: CreateWaifuDTO): Promise<ResultModel<string>> {
    const waifu = createWaifuToWaifu(waifuDTO)

    await this.waifuRepository.create(waifu)

    return new ResultModel(true, null, waifu.id)
  }

  async update (waifuDTO: UpdateWaifuDTO): Promise<ResultModel<void>> {
    if (await this.waifuRepository.findById(waifuDTO.id) === null) {
      return new ResultModel(false, ['waifu doens\'t exists'])
    }

    const waifu = updateWaifuToWaifu(waifuDTO)

    await this.waifuRepository.update(waifu)

    return new ResultModel(true)
  }

  async delete (id: string): Promise<ResultModel<void>> {
    if (await this.waifuRepository.findById(id) === null) {
      return new ResultModel(false, ['waifu doens\'t exists'])
    }

    await this.waifuRepository.delete(id)

    return new ResultModel(true)
  }
}
