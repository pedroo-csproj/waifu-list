import { Request, Response } from 'express'

import { WaifuServices } from '../../domain/services/WaifuServices'
import { CreateWaifuDTO } from '../../domain/dtos/CreateWaifuDTO'

export class WaifusController {
  constructor (private readonly waifuServices: WaifuServices) { }

  async list (request: Request, response: Response): Promise<Response> {
    const waifus = await this.waifuServices.list()

    return response.status(200).json(waifus)
  }

  async create (request: Request, response: Response): Promise<Response> {
    const waifuDTO = new CreateWaifuDTO(request.body.name, request.body.image)

    const id = await this.waifuServices.create(waifuDTO)

    return response.status(201).json({ id })
  }
}
