import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const createdUser = await this.prisma.user.create({
      data: { email, password: hashedPassword },
    })

    return {
      accessToken: this.jwtService.sign({
        email: createdUser.email,
        id: createdUser.id,
      }),
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.NOT_FOUND,
      )
    }

    const payload = { sub: user.id, email: user.email }
    return { accessToken: this.jwtService.sign(payload) }
  }
}
