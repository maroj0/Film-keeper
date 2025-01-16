import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './db/film.schema';
import { CreateFilmDto } from './dto/film-request.dto';
import { FilmResponseDto } from './dto/film-response.dto';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findOne(id: string): Promise<FilmResponseDto> {
    const film = await this.filmModel.findOne({ _id: id }).exec();
    return film ? new FilmResponseDto(film.toObject()) : null;
  }

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return await createdFilm.save();
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
