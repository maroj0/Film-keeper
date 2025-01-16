import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilmRepository } from './film.repository';
import { CreateFilmDto } from './dto/film-request.dto';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FilmService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly httpService: HttpService,
  ) {}

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
    const url = 'https://swapi.dev/api/films/';
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      const results = await Promise.all(
        response.data.results.map(async (film) => {
          await this.filmRepository.create({
            title: 'Star Wars: ' + film.title,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
            cover: film.url,
            synopsis: film.opening_crawl.slice(0, 500),
            gender: 'Science fiction',
          });
        }),
      );
      return results;
    } catch (error) {
      throw new Error(`Error al obtener datos de SWAPI: ${error.message}`);
    }
  }

  @Cron('0 8 * * * *')
  async updateStarWarsCron() {
    console.log('cron');
    await this.updateStarWars();
  }
}
