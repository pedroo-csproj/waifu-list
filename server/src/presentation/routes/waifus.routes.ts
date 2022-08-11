import express, { Request, Response, Router } from 'express'

import { waifusController } from '../../crossCutting/crossCutting'

export const waifusRoutes = (): Router => {
  const router = express.Router()

  router.get('', (request: Request, response: Response) => {
    waifusController.list(request, response)
  })

  return router
}
