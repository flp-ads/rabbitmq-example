import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [RabbitmqModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
