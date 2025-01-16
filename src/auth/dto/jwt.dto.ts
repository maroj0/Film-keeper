import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
