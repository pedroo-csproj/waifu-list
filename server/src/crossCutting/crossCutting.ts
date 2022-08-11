import { WaifuServices } from '../domain/services/WaifuServices'
import { PrismaService } from '../infra/data/prismaService'
import { WaifuRepository } from '../infra/data/repositories/WaifuRepository'
import { WaifusController } from '../presentation/controllers/waifus.controller'

const prismaService = new PrismaService()
const waifuRepository = new WaifuRepository(prismaService)
const waifuServices = new WaifuServices(waifuRepository)
const waifusController = new WaifusController(waifuServices)

export { waifusController }
