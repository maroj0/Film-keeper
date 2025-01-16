import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRequestDto } from './dto/register.dto';
import { LoginRequestDto } from './dto/login.dto';
import { JwtDto } from './dto/jwt.dto';
import { Role } from './db/auth.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  /**
   * Register a new user. This endpoint returns a JWT token
   * which can be used to authenticate the user in subsequent requests.
   *
   * @param registerRequestDTO The information about the user to register.
   * @returns A JWT token which can be used to authenticate the user.
   */
  async register(
    @Body() registerRequestDTO: RegisterRequestDto,
  ): Promise<JwtDto> {
    return this.authService.register({
      role: Role.USER,
      ...registerRequestDTO,
    });
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Email or password incorrect' })
  /**
   * Login with credentials. This endpoint returns a JWT token
   * which can be used to authenticate the user in subsequent requests.
   *
   * @param loginRequestDTO The information about the user to login.
   * @returns A JWT token which can be used to authenticate the user.
   */
  async login(@Body() loginRequestDTO: LoginRequestDto): Promise<JwtDto> {
    return this.authService.login(loginRequestDTO);
  }
}
