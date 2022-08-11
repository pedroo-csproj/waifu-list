import { Request, Response } from 'express'

export class WaifusController {
  async list (request: Request, response: Response): Promise<Response> {
    const waifus = [
      { id: '1', name: 'Asuka Langley' },
      { id: '2', name: 'Hatsune Miku' }
    ]

    return response.status(200).json(waifus)
  }
}
