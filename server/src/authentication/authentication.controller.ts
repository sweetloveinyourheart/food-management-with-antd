import { Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUser(@Request() req) {
    return req.user
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user)
  }

  @Get('/refresh-token')
  async refreshToken(@Query('token') token: string) {
    return this.authenticationService.refreshToken(token)
  }
}
