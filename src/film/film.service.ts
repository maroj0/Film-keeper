import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilmRepository } from './film.repository';
import { CreateFilmDto } from './dto/film-request.dto';

@Injectable()
export class FilmService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async findAll() {
    return this.filmRepository.findAll();
  }

  async findOne(id: string) {
    return this.filmRepository.findOne(id);
  }

  async create(createFilmDto: CreateFilmDto) {
    const film = await this.filmRepository.findByTitle(createFilmDto.title);
    if (film) {
      throw new HttpException('Film already exists', HttpStatus.BAD_REQUEST);
    }
    return this.filmRepository.create(createFilmDto);
  }

  async update(id: string, updateFilmDto: CreateFilmDto) {
    const film = await this.filmRepository.findOne(id);
    if (film) {
      return this.filmRepository.update(id, updateFilmDto);
    }
    throw new HttpException('Film not exists', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    const film = await this.filmRepository.findOne(id);
    if (!film) {
      throw new HttpException('Film not exists', HttpStatus.NOT_FOUND);
    }
    return this.filmRepository.delete(id);
  }

  async findByTitle(title: string) {
    return this.filmRepository.findByTitle(title);
  }

  async updateStarWars() {
    // return this.filmRepository.updateStartWars();
  }
}
