import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../common/users.service';
import { UsersRoles } from './users-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(
    fullName: string,
    email: string,
    password: string,
    role: UsersRoles,
  ) {
    const users = await this.usersService.find(role, email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    const user = await this.usersService.create(fullName, email, hash, role);

    return user;
  }

  async signin(email: string, password: string, role: UsersRoles) {
    const [user] = await this.usersService.find(role, email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch: Boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
