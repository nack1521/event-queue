import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './schemas/order.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { StockProducer } from 'src/stock-queue/stock.producer';
import { StockQueueModule } from 'src/stock-queue/stock-queue.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    StockQueueModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService, StockProducer],
  exports: [OrdersService],
})
export class OrdersModule {}
