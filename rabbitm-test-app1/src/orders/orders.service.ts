import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/database/prisma.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor (
    private prisma: PrismaService,
    private amqpConnection: AmqpConnection
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.prisma.order.create({
      data: {
        price: createOrderDto.price,
        total: createOrderDto.total,
        status: 'PENDING'
      }
    })
    this.amqpConnection.publish("amq.direct", "order.created", newOrder)
    return {message: 'order created', data: newOrder}
  }

  async findAll() {
    const orders = await this.prisma.order.findMany()
    return orders
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      where: {id:id},
      data: {status: updateOrderDto.status}
    })
    return order;
  }

}
