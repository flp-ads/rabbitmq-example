import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsConsumer } from './payments.consumer';

@Module({
  controllers: [],
  providers: [PaymentsService, PaymentsConsumer],
})
export class PaymentsModule {}
