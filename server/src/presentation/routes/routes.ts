import express, { Router } from 'express'

import { waifusRoutes } from './waifus.routes'

export const routes = (): Router => {
  const router = express.Router()

  router.use('/waifus', waifusRoutes())

  return router
}
