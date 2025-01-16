import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  release_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  producer: string;

  @ApiProperty()
  @IsNotEmpty()
  director: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(500)
  synopsis: string;

  @ApiProperty()
  @IsNotEmpty()
  cover: string;
}
