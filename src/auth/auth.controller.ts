import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterInput } from './dto/register.input';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerInput: RegisterInput) {
    const user = await this.usersService.findOne({
      where: { email: registerInput.email },
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists',
        },
        HttpStatus.FORBIDDEN,
        {},
      );
    }
    return this.usersService.create(registerInput);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() @Body() req) {
    return req.user;
  }
}
