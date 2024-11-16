import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: number, title: string, description?: string) {
    return this.prisma.task.create({
      data: { title, description, userId },
    })
  }

  async getTasks(userId: number) {
    return this.prisma.task.findMany({ where: { userId } })
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } })
  }
}
