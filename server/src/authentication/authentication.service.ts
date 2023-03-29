import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService
  ) { }


  private dummyAccounts = [
    { userId: "user_01", username: 'admin', password: process.env.ADMIN_PASSWORD }
  ]

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.dummyAccounts[0]

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '1d' })
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken)
      const { iat, exp, ...payload } = decoded
      return {
        access_token: this.jwtService.sign(payload)
      };

    } catch (error) {
      throw new UnauthorizedException()
    }
    
  }
}
