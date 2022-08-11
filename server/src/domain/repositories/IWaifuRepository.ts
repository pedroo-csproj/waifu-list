import { Waifu } from '@prisma/client'

export interface IWaifuRepository {
    list(): Promise<Waifu[]>
    findById(id: string): Promise<Waifu>
    create(waifu: Waifu): Promise<void>
    update(waifu: Waifu): Promise<void>
    delete(id: string): Promise<void>
}
