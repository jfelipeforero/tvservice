import { Body, Controller, Post } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // This controller is empty because all the creation responsabiliy is delegated
  // to the orders controller in the OrdersModule

  // This controller is meant to be used to queries of the tickets, but not orders.
  // The difference between ticket and order is that an order posees other properties
  // including the technician reference.
}
