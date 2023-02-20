import { Technician } from 'src/technicians/technician.entity';
import { Ticket } from 'src/tickets/ticket.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Ticket)
  @JoinColumn()
  ticket: Ticket;

  @ManyToOne(() => Technician, (technician) => technician.orders)
  technician: Technician;

  @Column({ default: OrderStatus.Scheduled })
  status: OrderStatus;

  @Column()
  installationDate: Date;
}
