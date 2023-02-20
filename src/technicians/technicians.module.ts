import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/order.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { Technician } from './technician.entity';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';

@Module({
  imports: [TypeOrmModule.forFeature([Technician, Order])],
  controllers: [TechniciansController],
  exports: [TechniciansService, TypeOrmModule],
  providers: [TechniciansService],
})
export class TechniciansModule {}
