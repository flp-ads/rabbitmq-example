import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
    constructor (private amqpConnection: AmqpConnection) {}

    private async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve,ms))
    }

    async processPayment(order: {id: number, price: number, total: number, status: string}) {
        await this.sleep(3000) // chamada para o gateway de pagamento
        order.status = 'APPROVED'
        this.amqpConnection.publish("amq.direct", "order.created", order)
    }

   
}
