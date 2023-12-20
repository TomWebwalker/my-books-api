import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorInput {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
