import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { PrismaService } from './prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [AuthModule, TasksModule, ConfigModule.forRoot({ isGlobal: true })],
  exports: [PrismaService],
  providers: [PrismaService],
})
export class AppModule {}
