import { ApiProperty } from '@nestjs/swagger';

export class GetAuthorInput {
  @ApiProperty()
  id: number;
}
