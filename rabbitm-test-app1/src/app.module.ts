import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [RabbitmqModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
