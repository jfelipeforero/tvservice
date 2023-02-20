import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/order.entity';
import { Not, Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private readonly repo: Repository<Client>, // @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
  ) {}
  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.repo.findOneByOrFail({ id });
      return client;
    } catch (err) {
      throw new NotFoundException(
        'Client with the id provided was not found in the database',
      );
    }
  }
  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<Client>): Promise<Client> {
    try {
      const user = await this.findOne(id);
      Object.assign(user, attrs);
      return this.repo.save(user);
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<Client> {
    try {
      const user = await this.findOne(id);
      return this.repo.remove(user);
    } catch (err) {
      throw err;
    }
  }

  // async findAllOrders(id: number): Promise<Order[]> {
  //   const orders = await this.ordersRepo
  //     .createQueryBuilder('order')
  //     .leftJoinAndSelect('order.ticket', 'ticket')
  //     .where('order.client = :id', { id })
  //     .getMany();
  //   console.log(orders);
  //   return orders;
  // }
}
