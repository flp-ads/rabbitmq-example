import { Injectable } from "@nestjs/common";
import { Nack, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { PaymentsService } from "./payments.service";

@Injectable()
export class PaymentsConsumer {
    constructor(private readonly paymentsService: PaymentsService) {}

    @RabbitSubscribe({
        exchange: "amq.direct",
        routingKey: "order.created",
        queue: "orders",
        
    })
    async consume(msg: {id: number, price: number, total: number, status: string }){
        try {
            await this.paymentsService.processPayment(msg)
            console.log('mensagem consumida app2', msg)
        } catch (error) {
            return new Nack(true)
        }
    }
    // ACK MODE
    // ack (mensagem processada, descarte a mensagem)
    // nack (falha ao processar a mensagem, descarte enfileire novamente)

    // tipos de erros
    // erros recuperaveis - parceiro fora do ar, instabilidade no banco, falha de rede
        // precisa ter um limite - dead letter queue, delayded messages
        // garantia de entrega 1 vez. mas pode chegar mais, idempotencia
    // erros não recuperaveis - formado da mensagem inválida, não está de acordo com alguma regra de negócio

    // https://www.rabbitmq.com/blog/2015/04/16/scheduling-messages-with-rabbitmq
    // https://www.rabbitmq.com/docs/dlx

    
}