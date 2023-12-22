import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginInput, RegisterInput } from './dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiBody({ type: RegisterInput })
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

  @Post('login')
  @ApiBody({ type: LoginInput })
  login(@Body() { email, password }: LoginInput) {
    return this.authService.validateUser(email, password);
  }
}
