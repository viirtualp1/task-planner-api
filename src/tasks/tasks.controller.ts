import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '@nestjs/passport'
import { UserRequest } from '../auth/user-request'

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(
    @Request() req: UserRequest,
    @Body() body: { title: string; description?: string },
  ) {
    return this.tasksService.createTask(
      req.user.userId,
      body.title,
      body.description,
    )
  }

  @Get()
  getTasks(@Request() req: UserRequest) {
    return this.tasksService.getTasks(req.user.userId)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id))
  }
}
