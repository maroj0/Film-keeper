import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film, FilmSchema } from './db/film.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository } from './film.repository';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmController],
  providers: [
    FilmService,
    FilmRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [FilmService],
})
export class FilmModule {}
