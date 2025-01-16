import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty({
    example: '65a123456789abcdef123456',
    description: 'Identificador único de la película',
  })
  id: string;

  @ApiProperty({ example: 'Star Wars', description: 'Título de la película' })
  title: string;

  @ApiProperty({
    example: '1977-05-25',
    description: 'Fecha de estreno',
    type: String,
    format: 'date',
  })
  release_date: Date;

  @ApiProperty({
    example: 'George Lucas',
    description: 'Productor de la película',
  })
  producer: string;

  @ApiProperty({
    example: 'George Lucas',
    description: 'Director de la película',
  })
  director: string;

  @ApiProperty({ example: 'Sci-Fi', description: 'Género de la película' })
  gender: string;

  @ApiProperty({
    example: 'Una aventura espacial...',
    description: 'Sinopsis de la película',
    maxLength: 500,
  })
  synopsis: string;

  @ApiProperty({
    example: 'https://url_to_cover.jpg',
    description: 'URL de la portada de la película',
  })
  cover: string;

  constructor(data: Partial<FilmDto> = {}) {
    Object.assign(this, data);
  }
}
