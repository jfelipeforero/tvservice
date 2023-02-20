import { Controller, Get, Param, ParseIntPipe, Session } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // @Get('orders')
  // async getOrders(@Session() session: any) {
  //   const orders = await this.clientsService.findAllOrders(session.userId);
  //   return orders;
  // }
}
