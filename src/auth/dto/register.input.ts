import { ApiProperty } from '@nestjs/swagger';

export class RegisterInput {
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
