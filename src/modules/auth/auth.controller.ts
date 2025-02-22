import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Public } from '@app/common';
import { AuthResponse, SignInDto, SignUpDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
@LoggerApi()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  @ApiOperation({ summary: '[SignIn]', description: 'Sign in user' })
  @ApiResponse({ type: AuthResponse, status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInDto): Promise<AuthResponse> {
    return await this.authService.signIn(data);
  }

  @Public()
  @Post('signUp')
  @ApiOperation({ summary: '[SignUp]', description: 'Sing up user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: AuthResponse })
  async signUp(@Body() data: SignUpDto): Promise<AuthResponse> {
    return await this.authService.signUp(data);
  }
}
