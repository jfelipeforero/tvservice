import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technician } from 'src/technicians/technician.entity';
import { Ticket } from 'src/tickets/ticket.entity';
import { Repository } from 'typeorm';
import { OrderStatus } from './order-status.enum';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}

  async create(ticket: Ticket, technician: Technician) {
    const randomNum = Math.floor(Math.random() * 121);
    const installationDate = new Date(
      ticket.startTime.getTime() + randomNum * 60 * 1000,
    ).toISOString();
    const order = await this.repo.create({
      technician,
      status: OrderStatus.Scheduled,
      ticket,
      installationDate,
    });

    return this.repo.save(order);
  }

  async findOne(id: number) {
    try {
      const order = await this.repo.findOneByOrFail({ id });
      return order;
    } catch (error) {
      throw new NotFoundException('Order not found');
    }
  }

  async changeStatus(order: Order, status: OrderStatus) {
    order.status = status;
    return this.repo.save(order);
  }
}
