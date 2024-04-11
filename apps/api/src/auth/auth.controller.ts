import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, SignUserDto, UpdateUserDto } from 'src/dto';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards';
import { Tokens } from './types';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignUserDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Body() dto: UpdateUserDto, @Param('id') id: string) {
    return this.authService.update(dto, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('users')
  getUsers() {
    return this.authService.allUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.authService.getUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-reset-code')
  async sendResetCode(@Body('email') email: string): Promise<object> {
    await this.authService.sendPasswordResetCode(email);
    return { message: `Code has been successfully sent to ${email}` };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signout')
  signout(@GetCurrentUserId() userId: string): Promise<boolean> {
    return this.authService.signout(userId);
  }



  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUserId() userId: string, @GetCurrentUser('refreshToken') refreshToken: string ): Promise<Tokens> {
    console.log(userId, refreshToken)
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    await this.authService.resetPassword(email, code, newPassword);
  }
}