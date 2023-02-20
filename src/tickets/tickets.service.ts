import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { UsersService } from 'src/common/users.service';
import { OrdersService } from 'src/orders/orders.service';
import { TechniciansService } from 'src/technicians/technicians.service';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private readonly repo: Repository<Ticket>,
    private readonly usersService: UsersService,
  ) {}

  async create(ticketDto: any, session: any) {
    //  I tried to use @Transformer with class-tranformer instead of what
    //  i did below but it couldn't make it work

    ticketDto.lat = parseFloat(ticketDto.lat);
    ticketDto.lng = parseFloat(ticketDto.lng);
    ticketDto.startTime = new Date(Date.parse(ticketDto.startTime));
    ticketDto.endTime = new Date(Date.parse(ticketDto.endTime));

    const token = randomBytes(16).toString('hex');
    ticketDto.token = token;
    const client = await this.usersService.findOne(
      session.userId,
      session.role,
    );
    const ticket = await this.repo.create({
      token: ticketDto.token,
      client,
      lat: parseFloat(ticketDto.lat),
      lng: parseFloat(ticketDto.lng),
      startTime: ticketDto.startTime,
      endTime: ticketDto.endTime,
    });
    return this.repo.save(ticket);
  }

  async findOne(id: number) {
    try {
      const ticket = await this.repo.findOneByOrFail({ id });
      return ticket;
    } catch (error) {
      throw new NotFoundException('Ticket not found');
    }
  }

  async findAll() {
    const tickets = await this.repo.find({});
    return tickets;
  }

  async findAllTicketsUser(id: number) {
    const tickets = this.repo
      .createQueryBuilder('ticket')
      .leftJoin('ticket.user', 'user')
      .where('user.id=:id', { id })
      .orderBy('ticket.createdAt', 'DESC')
      .getMany();

    return tickets;
  }

  async update(id: number, attrs: Partial<Ticket>) {
    try {
      const ticket = await this.findOne(id);
      Object.assign(ticket, attrs);
      return this.repo.save(ticket);
    } catch (error) {
      throw new NotFoundException('Ticket not found');
    }
  }

  async remove(id: number) {
    try {
      const ticket = await this.findOne(id);
      return this.repo.remove(ticket);
    } catch (error) {
      throw new NotFoundException('Ticket not found');
    }
  }
}
