import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from 'src/clients/clients.module';
import { UsersService } from '../common/users.service';
import { TechniciansModule } from 'src/technicians/technicians.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { Technician } from 'src/technicians/technician.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Technician]),
    ClientsModule,
    CommonModule,
    TechniciansModule,
    PassportModule,
  ],
  providers: [AuthService, UsersService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
