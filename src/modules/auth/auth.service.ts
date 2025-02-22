import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '@repositoryModule';
import { LoggerServiceDecorator } from '@app/common';
import { AuthResponse, SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  @LoggerServiceDecorator()
  async signIn(data: SignInDto): Promise<AuthResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ where: { email: data.email } });

      if (!existsUser) {
        throw new NotFoundException('User not found');
      }

      const isPasswordCorrect = await bcrypt.compare(data.password, existsUser.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('Password incorrect');
      }

      const payload = {
        id: existsUser.id,
        firstName: existsUser.firstName,
        lastName: existsUser.lastName,
        email: existsUser.email,
        role: existsUser.role,
      };
      const access_token = await this.jwtService.sign(payload);

      return {
        ...existsUser,
        access_token,
      };
    } catch (error) {
      console.error('Error sign in:', error);
      throw new BadRequestException(`[signIn-Auth] error: ${error.message}`);
    }
  }

  @LoggerServiceDecorator()
  async signUp(data: SignUpDto): Promise<AuthResponse> {
    try {
      const existsUser = await this.usersRepository.findOne({ where: { email: data.email } });

      if (existsUser) {
        throw new BadRequestException('User already registered');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const createdUser = await this.usersRepository.create({
        ...data,
        password: hashedPassword,
      });

      const payload = {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        role: createdUser.role,
      };
      const access_token = await this.jwtService.sign(payload);

      return {
        ...createdUser,
        access_token,
      };
    } catch (error) {
      throw new BadRequestException(`[signUp-Auth] error: ${error.message}`);
    }
  }
}
