import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
