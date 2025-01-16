import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FilmResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  release_date: Date;

  @ApiProperty()
  @Expose()
  producer: string;

  @ApiProperty()
  @Expose()
  director: string;

  @ApiProperty()
  @Expose()
  gender: string;

  @ApiProperty()
  @Expose()
  synopsis: string;

  @ApiProperty()
  @Expose()
  cover: string;

  constructor(partial: Partial<FilmResponseDto>) {
    Object.assign(this, partial);
  }
}
