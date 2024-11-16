import { Injectable } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      imports: [ConfigModule],
      inject: [ConfigService],
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: (configService: ConfigService) =>
        configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }
  }
}
