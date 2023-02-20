import {
  Controller,
  Param,
  Post,
  ParseIntPipe,
  Get,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { UsersService } from 'src/common/users.service';
import { Technician } from './technician.entity';
import { TechniciansService } from './technicians.service';

@Controller('technician')
export class TechniciansController {
  constructor(
    private readonly techniciansService: TechniciansService, // private readonly usersService: UsersService,
  ) {}

  // @Get('tech')
  // async findTechnician(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Technician> {
  //   const tech = await this.usersService.find('technician', id);
  //   if (!tech) {
  //     throw new NotFoundException('Technician not found');
  //   }
  //   return tech
  // }

  // The endpoint receives the technician id through the session when signin in,
  // so you must be authenticated in order to retrieve all the orders
  @Get('orders')
  async getTechnicianOrders(@Session() session: any) {
    const orders = await this.techniciansService.findAllOrders(session.userId);
    return orders;
  }
}
