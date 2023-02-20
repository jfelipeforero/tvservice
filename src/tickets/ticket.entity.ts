import { Client } from 'src/clients/client.entity';
import { Order } from 'src/orders/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  // @OneToOne(() => Order, (order) => order.ticket, { onDelete: 'CASCADE' })
  // order: Order;

  @ManyToOne(() => Client, (client) => client.ticket)
  client: Client;

  @Column({ type: 'float' })
  lat: number;

  @Column({ type: 'float' })
  lng: number;

  @CreateDateColumn()
  dateIssued: Date;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;
}
