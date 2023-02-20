import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Session,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TechniciansService } from 'src/technicians/technicians.service';
import { CreateTicketDto } from 'src/tickets/dtos/create-ticket.dto';
import { TicketsService } from 'src/tickets/tickets.service';
import { OrderDto } from './dtos/order.dto';
import { OrderStatus } from './order-status.enum';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly techniciansService: TechniciansService,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('create')
  // @Serialize(OrderDto)
  async createOrder(@Body() body: CreateTicketDto, @Session() session: any) {
    if (!session) {
      throw new BadRequestException('User not authenticated');
    }
    const ticket = await this.ticketsService.create(body, session);
    const tech = await this.techniciansService.findRandom();
    const order = this.ordersService.create(ticket, tech);
    return order;
  }

  @Get(':id/:status')
  async changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status') status: OrderStatus,
  ) {
    let order = await this.ordersService.findOne(id);
    order = await this.ordersService.changeStatus(order, status);
    return order;
  }
}
