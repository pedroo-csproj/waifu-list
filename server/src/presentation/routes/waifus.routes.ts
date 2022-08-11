import express, { Request, Response, Router } from 'express'

import { waifusController } from '../../crossCutting/crossCutting'

export const waifusRoutes = (): Router => {
  const router = express.Router()

  router.get('', (request: Request, response: Response) => {
    waifusController.list(request, response)
  })

  router.post('', (request: Request, response: Response) => {
    waifusController.create(request, response)
  })

  return router
}
