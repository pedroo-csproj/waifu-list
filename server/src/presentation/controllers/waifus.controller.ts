import { Request, Response } from 'express'

import { WaifuServices } from '../../domain/services/WaifuServices'
import { CreateWaifuDTO } from '../../domain/dtos/CreateWaifuDTO'
import { UpdateWaifuDTO } from '../../domain/dtos/UpdateWaifuDTO'

export class WaifusController {
  constructor (private readonly waifuServices: WaifuServices) { }

  async list (request: Request, response: Response): Promise<Response> {
    const listWaifus = await this.waifuServices.list()

    return response.status(200).json(listWaifus.data)
  }

  async findById (request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const findWaifu = await this.waifuServices.findById(id)

    if (!findWaifu.status) {
      return response.status(404).json(findWaifu.errors)
    }

    return response.status(200).json(findWaifu)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const waifuDTO = new CreateWaifuDTO(request.body.name, request.body.image)

    const createWaifu = await this.waifuServices.create(waifuDTO)

    return response.status(201).json({ id: createWaifu.data })
  }

  async update (request: Request, response: Response): Promise<Response> {
    const waifuDTO = new UpdateWaifuDTO(request.body.id, request.body.name, request.body.image)

    const updateWaifu = await this.waifuServices.update(waifuDTO)

    if (!updateWaifu.status) {
      return response.status(404).json(updateWaifu.errors)
    }

    return response.status(204).send()
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const deleteWaifu = await this.waifuServices.delete(id)

    if (!deleteWaifu.status) {
      return response.status(404).json(deleteWaifu.errors)
    }

    return response.status(204).send()
  }
}
