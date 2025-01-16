import { IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../db/auth.schema';

export class RegisterRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  fullName: string;

  role: Role;

  constructor(email: string, password: string, fullName: string) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
  }
}
