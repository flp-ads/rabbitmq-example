import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersConsumer } from './orders.consumer';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrdersConsumer],
})
export class OrdersModule {}
