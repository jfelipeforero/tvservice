import { IsEmail, IsString } from 'class-validator';
import { UsersRoles } from '../users-role.enum';

export class CreateUserDto {
  @IsString()
  fullName?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: UsersRoles;
}
