import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { Technician } from 'src/technicians/technician.entity';
import { TechniciansModule } from 'src/technicians/technicians.module';
import { UsersService } from './users.service';

@Module({
  imports: [
    ClientsModule,
    TechniciansModule,
    TypeOrmModule.forFeature([Client, Technician]),
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
})
export class CommonModule {}
