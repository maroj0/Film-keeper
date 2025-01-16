import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginRequestDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';
import { RegisterRequestDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registerDTO: RegisterRequestDto): Promise<JwtDto> {
    registerDTO.email = registerDTO.email.toLowerCase();
    const auth = await this.authRepository.findUserByEmail(registerDTO.email);
    if (auth) {
      throw new HttpException(
        'Este email ya ha sido registrado',
        HttpStatus.CONFLICT,
      );
    } else {
      const hashedPassword = await this.hashPassword(registerDTO.password);
      const authCreated = await this.authRepository.createUser({
        ...registerDTO,
        password: hashedPassword,
      });
      const jwt = await this.jwtService.signAsync(
        { sub: authCreated.id },
        { secret: this.configService.get<string>('JWT_SECRET') },
      );
      return new JwtDto(jwt);
    }
  }

  public async login(loginDTO: LoginRequestDto): Promise<JwtDto> {
    loginDTO.email = loginDTO.email.toLowerCase();
    const auth = await this.authRepository.findUserByEmail(loginDTO.email);
    if (!auth)
      throw new HttpException('Email no registrado', HttpStatus.NOT_FOUND);
    const isCorrectPassword = await this.comparePassword(
      loginDTO.password,
      auth.password,
    );
    if (!isCorrectPassword)
      throw new HttpException(
        'Email o contraseña incorrecta',
        HttpStatus.NOT_FOUND,
      );
    const jwt = await this.jwtService.signAsync(
      { sub: auth.id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    return new JwtDto(jwt);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async comparePassword(
    password: string,
    hash: string | null,
  ): Promise<boolean> {
    if (!hash) return false;
    return await bcrypt.compare(password, hash);
  }
}
