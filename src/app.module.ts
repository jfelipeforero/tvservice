import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TicketsModule } from './tickets/tickets.module';
import { OrdersModule } from './orders/orders.module';
import { TechniciansModule } from './technicians/technicians.module';
import { Client } from './clients/client.entity';
import { CommonModule } from './common/common.module';
import { UsersService } from './common/users.service';
import { Technician } from './technicians/technician.entity';
import { Ticket } from './tickets/ticket.entity';
import { Order } from './orders/order.entity';
import * as session from 'express-session';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'postgres',
          port: 5432,
          username: 'username',
          password: 'password',
          database: 'tvservice',
          synchronize: true,
          logging: false,
          entities: [Client, Technician, Ticket, Order],
        };
      },
    }),
    AuthModule,
    ClientsModule,
    TicketsModule,
    OrdersModule,
    TechniciansModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'my-secret',
          resave: false,
          saveUninitialized: false,
        }),
      )
      .forRoutes('*');
  }
}
