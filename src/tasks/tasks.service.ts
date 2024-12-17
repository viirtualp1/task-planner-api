import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: number, title: string, description?: string) {
    if (!userId) {
      throw new HttpException(
        'Provide userId for get tasks',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (!title) {
      throw new HttpException(
        'Provide title to create a task',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    if (!description) {
      throw new HttpException(
        'Provide description to create a task',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }

    return this.prisma.task.create({
      data: { title, description, userId },
    })
  }

  async getTasks(userId: number) {
    if (!userId) {
      throw new HttpException(
        'Provide userId for get tasks',
        HttpStatus.BAD_REQUEST,
      )
    }

    return this.prisma.task.findMany({ where: { userId } })
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } })
  }
}
