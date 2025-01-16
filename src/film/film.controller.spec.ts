import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { FilmRepository } from './film.repository'; // Ajusta el path según tu estructura
import { HttpService, HttpModule } from '@nestjs/axios'; // Importa HttpModule
import { AuthRepository } from '../auth/auth.repository';
import { AttachUserDataInterceptor } from '../interceptor/user.interceptor';

describe('FilmController', () => {
  let controller: FilmController;
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule], // Agrega HttpModule para resolver HttpService
      controllers: [FilmController],
      providers: [
        FilmService,
        {
          provide: FilmRepository,
          useValue: {
            // Mockea FilmRepository
            create: jest.fn().mockResolvedValue({
              id: '123',
              title: 'Test Film',
              releaseYear: new Date('2025-01-16T12:24:48.561Z'),
              genres: 'Action',
            }),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            update: jest.fn().mockResolvedValue({
              id: '123',
              title: 'Updated Film',
              releaseYear: new Date('2026-01-16T12:24:48.561Z'),
              genres: 'Action Updated',
            }),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: HttpService, // Mockea HttpService si no necesitas realizar peticiones HTTP reales
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
        AuthRepository, // Registra AuthRepository aquí
        AttachUserDataInterceptor, // Si el interceptor depende de AuthRepository
      ],
    }).compile();

    controller = module.get<FilmController>(FilmController);
    service = module.get<FilmService>(FilmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a film', async () => {
    const createFilmDto = {
      title: 'Test Film',
      release_date: new Date('2025-01-16T12:24:48.561Z'),
      producer: 'Test Producer',
      director: 'Test Director',
      gender: 'Action',
      cover: 'Test Cover',
      synopsis: 'Test Synopsis',
    };

    const result = await controller.create(createFilmDto);

    expect(result).toEqual({
      id: expect.any(String),
      title: createFilmDto.title,
      releaseYear: createFilmDto.release_date,
      genres: createFilmDto.gender,
    });
  });

  it('should search by id', async () => {
    const createFilmDto = {
      title: 'Test Film',
      release_date: new Date('2025-01-16T12:24:48.561Z'),
      producer: 'Test Producer',
      director: 'Test Director',
      gender: 'Action',
      cover: 'Test Cover',
      synopsis: 'Test Synopsis',
    };

    const createdFilm = await service.create(createFilmDto);

    const result = await service.findOne(createdFilm.id);

    expect(result).toEqual({
      id: createdFilm.id,
      title: createFilmDto.title,
      releaseYear: createFilmDto.release_date,
      genres: createFilmDto.gender,
    });
  });

  it('should return all films', async () => {
    const createFilmDto = {
      title: 'Test Film',
      release_date: new Date('2025-01-16T12:24:48.561Z'),
      producer: 'Test Producer',
      director: 'Test Director',
      gender: 'Action',
      cover: 'Test Cover',
      synopsis: 'Test Synopsis',
    };

    await service.create(createFilmDto);

    const result = await service.findAll();

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          title: createFilmDto.title,
          releaseYear: createFilmDto.release_date,
          genres: createFilmDto.gender,
        }),
      ]),
    );
  });

  it('should update a film', async () => {
    const createFilmDto = {
      title: 'Test Film',
      release_date: new Date('2025-01-16T12:24:48.561Z'),
      producer: 'Test Producer',
      director: 'Test Director',
      gender: 'Action',
      cover: 'Test Cover',
      synopsis: 'Test Synopsis',
    };

    const createdFilm = await service.create(createFilmDto);

    const updateFilmDto = {
      title: 'Test Film Updated',
      release_date: new Date('2026-01-16T12:24:48.561Z'),
      producer: 'Test Producer Updated',
      director: 'Test Director Updated',
      gender: 'Action Updated',
      cover: 'Test Cover Updated',
      synopsis: 'Test Synopsis Updated',
    };

    const result = await controller.update(createdFilm.id, updateFilmDto);

    expect(result).toEqual({
      id: createdFilm.id,
      title: updateFilmDto.title,
      releaseYear: updateFilmDto.release_date,
      genres: updateFilmDto.gender,
    });
  });

  it('should delete a film', async () => {
    const createFilmDto = {
      title: 'Test Film',
      release_date: new Date('2025-01-16T12:24:48.561Z'),
      producer: 'Test Producer',
      director: 'Test Director',
      gender: 'Action',
      cover: 'Test Cover',
      synopsis: 'Test Synopsis',
    };

    const createdFilm = await service.create(createFilmDto);

    await controller.delete(createdFilm.id);

    const result = await service.findOne(createdFilm.id);
    expect(result).toBeNull();
  });
});
