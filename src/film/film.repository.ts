import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './db/film.schema';
import { CreateFilmDto } from './dto/film-request.dto';
import { FilmResponseDto } from './dto/film-response.dto';
import { FilmDto } from './dto/film.dto';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findOne(id: string): Promise<FilmResponseDto> {
    try {
      const film = await this.filmModel.findOne({ _id: id }).exec();
      return film ? new FilmResponseDto(film.toObject()) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async create(createFilmDto: CreateFilmDto): Promise<FilmDto> {
    const createdFilm = new this.filmModel(createFilmDto);
    return new FilmDto((await createdFilm.save()).toObject());
  }

  async findByTitle(title: string): Promise<Film> {
    return this.filmModel.findOne({ title }).exec();
  }

  async update(id: string, updateFilmDto: CreateFilmDto) {
    return this.filmModel.updateOne({ _id: id }, updateFilmDto).exec();
  }

  async delete(id: string) {
    return this.filmModel.deleteOne({ _id: id }).exec();
  }
}
