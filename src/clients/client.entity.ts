import { UsersRoles } from 'src/auth/users-role.enum';
import { Ticket } from 'src/tickets/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: UsersRoles;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Ticket, (ticket) => ticket.client)
  ticket: Ticket[];
}
