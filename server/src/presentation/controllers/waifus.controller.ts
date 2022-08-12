import { Request, Response } from 'express'

import { WaifuServices } from '../../domain/services/WaifuServices'
import { CreateWaifuDTO } from '../../domain/dtos/CreateWaifuDTO'
import { UpdateWaifuDTO } from '../../domain/dtos/UpdateWaifuDTO'

export class WaifusController {
  constructor (private readonly waifuServices: WaifuServices) { }

  async list (request: Request, response: Response): Promise<Response> {
    const waifus = await this.waifuServices.list()

    return response.status(200).json(waifus)
  }

  async findById (request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    const waifu = await this.waifuServices.findById(id)

    return response.status(200).json(waifu)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const waifuDTO = new CreateWaifuDTO(request.body.name, request.body.image)

    const id = await this.waifuServices.create(waifuDTO)

    return response.status(201).json({ id })
  }

  async update (request: Request, response: Response): Promise<Response> {
    const waifuDTO = new UpdateWaifuDTO(request.body.id, request.body.name, request.body.image)

    await this.waifuServices.update(waifuDTO)

    return response.status(204).send()
  }

  async delete (request: Request, response: Response): Promise<Response> {
    const id = request.params.id

    await this.waifuServices.delete(id)

    return response.status(204).send()
  }
}
