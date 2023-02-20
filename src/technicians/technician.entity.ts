import { UsersRoles } from 'src/auth/users-role.enum';
import { Order } from 'src/orders/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Technician {
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

  @OneToMany(() => Order, (orders) => orders.technician)
  orders: Order[];
}
