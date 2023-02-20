import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/order.entity';
import { Repository } from 'typeorm';
import { Technician } from './technician.entity';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private readonly techniciansRepo: Repository<Technician>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
  ) {}

  // create(
  //   fullName: string,
  //   email: string,
  //   password: string,
  // ): Promise<Technician> {
  //   const user = this.repo.create({ fullName, email, password });
  //   return this.repo.save(user);
  // }

  findRandom(): Promise<Technician> {
    return this.techniciansRepo
      .createQueryBuilder('technician')
      .orderBy('random()')
      .getOne();
  }

  async findAllOrders(id: number): Promise<Order[]> {
    console.log(id, 'hola');
    const orders = await this.ordersRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.ticket', 'ticket')
      .where('order.technician = :id', { id })
      .getMany();
    console.log(orders);
    return orders;
  }
}
