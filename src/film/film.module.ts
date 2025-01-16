import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { Film, FilmSchema } from './db/film.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmRepository } from './film.repository';
import { AuthRepository } from 'src/auth/auth.repository';
import { User, UserSchema } from 'src/auth/db/auth.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../auth/guards/role.guards';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [FilmController],
  providers: [
    FilmService,
    FilmRepository,
    AuthRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [FilmService, FilmRepository],
})
export class FilmModule {}
