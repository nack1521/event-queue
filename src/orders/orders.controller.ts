// src/orders/orders.controller.ts
import { Controller, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.shema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Patch(':id/shipped')  
  markShipped(@Param('id') id: string)  { 
    return this.orders.markShipped(id); 
  }


  @Patch(':id/complete') 
  markComplete(@Param('id') id: string) { 
    return this.orders.markComplete(id); 
  }

  @Post('dummy')
  async createDummyOrder(): Promise<Order> {
    return await this.orders.createDummyOrder();
  }
}
