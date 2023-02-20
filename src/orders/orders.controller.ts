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
import { Technician } from 'src/technicians/technician.entity';
import { TechniciansService } from 'src/technicians/technicians.service';
import { CreateTicketDto } from 'src/tickets/dtos/create-ticket.dto';
import { Ticket } from 'src/tickets/ticket.entity';
import { TicketsService } from 'src/tickets/tickets.service';
import { OrderDto } from './dtos/order.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Controller('order')
export class OrdersController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly techniciansService: TechniciansService,
    private readonly ordersService: OrdersService,
  ) {}

  // You must be signed in order to user this endpoint
  @Post('create')
  // @Serialize(OrderDto)
  async createOrder(@Body() body: CreateTicketDto, @Session() session: any) {
    if (!session.userId) {
      throw new BadRequestException(
        'You must be authenticated in order to create an order',
      );
    }
    const ticket: Ticket = await this.ticketsService.create(body, session);
    const tech: Technician = await this.techniciansService.findRandom();
    const order: Order = await this.ordersService.create(ticket, tech);

    return {
      installationDate: order.installationDate,
      technician: order.technician.fullName,
      status: order.status,
    };
  }

  // You must be signed in order to user this endpoint
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
