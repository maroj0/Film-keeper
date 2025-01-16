import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFilmDto } from './dto/film-request.dto';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../auth/db/auth.schema';
import { FilmResponseDto } from './dto/film-response.dto';
import { Film } from './db/film.schema';

@Controller('films')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtGuard)
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all films' })
  @ApiResponse({
    status: 200,
    description: 'Return all films',
    type: [FilmResponseDto],
  })
  async GetAll(): Promise<Film[]> {
    return this.filmService.findAll();
  }

  @Roles(Role.USER)
  @Get(':id')
  @ApiOperation({ summary: 'Get film by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return film by ID',
    type: FilmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async getById(@Param('id') id: string): Promise<FilmResponseDto> {
    return this.filmService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new film' })
  @ApiResponse({
    status: 201,
    description: 'Film created successfully',
    type: FilmResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Film already exists' })
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing film' })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully',
    type: FilmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async update(@Param('id') id: string, @Body() updateFilmDto: CreateFilmDto) {
    return this.filmService.update(id, updateFilmDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a film by ID' })
  @ApiResponse({ status: 200, description: 'Film deleted successfully' })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async delete(@Param('id') id: string) {
    return this.filmService.delete(id);
  }

  @Roles(Role.USER)
  @Get('search/:title')
  @ApiOperation({ summary: 'Search film by title' })
  @ApiResponse({
    status: 200,
    description: 'Return film by title',
    type: FilmResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Film not found' })
  async findByTitle(@Param('title') title: string) {
    return this.filmService.findByTitle(title);
  }

  @Roles(Role.ADMIN)
  @Get('star_wars')
  @ApiOperation({ summary: 'Update Star Wars films' })
  @ApiResponse({ status: 200, description: 'Star Wars films updated' })
  async updateStarWars() {
    return this.filmService.updateStarWars();
  }
}
