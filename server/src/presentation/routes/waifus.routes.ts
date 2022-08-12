import express, { Request, Response, Router } from 'express'

import { waifusController } from '../../crossCutting/crossCutting'

export const waifusRoutes = (): Router => {
  const router = express.Router()

  router.get('', (request: Request, response: Response) => {
    waifusController.list(request, response)
  })

  router.get('/:id', (request: Request, response: Response) => {
    waifusController.findById(request, response)
  })

  router.post('', (request: Request, response: Response) => {
    waifusController.create(request, response)
  })

  router.put('', (request: Request, response: Response) => {
    waifusController.update(request, response)
  })

  router.delete('/:id', (request: Request, response: Response) => {
    waifusController.delete(request, response)
  })

  return router
}
