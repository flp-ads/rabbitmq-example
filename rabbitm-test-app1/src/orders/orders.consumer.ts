import { Injectable } from "@nestjs/common";
import { Nack, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { OrdersService } from "./orders.service";


@Injectable()
export class OrdersConsumer {
    constructor(private readonly ordersService: OrdersService) {}

    @RabbitSubscribe({
        exchange: "amq.direct",
        routingKey: "order.updated",
        queue: "orders",
        
    })
    async consume(msg: {id: number, price: number, total: number, status: string }){
        const {id, ...rest} = msg
        await this.ordersService.update(id, rest)
        console.log('mensagem consumida app1', msg)
    }
    
}