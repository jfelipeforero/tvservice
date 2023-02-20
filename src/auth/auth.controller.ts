import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Technician } from 'src/technicians/technician.entity';
import { Client } from 'src/clients/client.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { UsersService } from 'src/common/users.service';

@Controller('auth')
// The serialize decorator strips the password out of the response of all auth
// endpoints
@Serialize(UserDto)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<Client | Technician> {
    const { fullName, email, password, role } = body;
    const user = await this.authService.signup(fullName, email, password, role);
    session.userId = user.id;
    session.role = user.role;
    return user;
  }

  @Get('/whoami')
  @HttpCode(HttpStatus.ACCEPTED)
  whoAmI(@Session() session: any) {
    console.log(session.userId, session.role);
    return this.usersService.findOne(session.userId, session.role);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() body: Partial<CreateUserDto>,
    @Session() session: any,
  ): Promise<Client | Technician> {
    const user = await this.authService.signin(
      body.email,
      body.password,
      body.role,
    );
    session.userId = user.id;
    session.role = user.role;
    return user;
  }
}
