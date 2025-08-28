import { Module } from '@nestjs/common';
import { STOCK_QUEUE, StockQueue } from './stock.queue';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { StockLedger, StockLedgerSchema } from 'src/log/schemas/stock-ledger.schema';
import { Order, OrderSchema } from 'src/orders/schemas/order.shema';
import { AppliedJob, AppliedJobSchema } from 'src/log/schemas/applied-job.schema';
import { WarehouseStock, WarehouseStockSchema } from 'src/warehouse-stock/schemas/warehouse-stock.schema';
import { ReservePacking, ReservePackingSchema } from 'src/reserve-packing/schemas/reserve-packing.schema';
import { StockProducer } from './stock.producer';
import { StockProcessor } from './stock.processor';
import { StockService } from './stock.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: STOCK_QUEUE,
    }),
    MongooseModule.forFeature([
      {name: Order.name, schema: OrderSchema},
      {name: WarehouseStock.name, schema: WarehouseStockSchema},
      {name: ReservePacking.name, schema: ReservePackingSchema},
      {name: StockLedger.name, schema: StockLedgerSchema},
      {name: AppliedJob.name, schema: AppliedJobSchema},
    ])
  ],
  controllers: [],
  providers: [StockQueue, StockProducer, StockProcessor, StockService],
  exports: [StockQueue],
})
export class StockQueueModule {}
