import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { StockQueueModule } from './stock-queue/stock-queue.module';
import { OrdersModule } from './orders/orders.module';
import { WarehouseStockModule } from './warehouse-stock/warehouse-stock.module';
import { ReservePackingModule } from './reserve-packing/reserve-packing.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017',
      { dbName: 'event-queue' }
    ),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        connection: {
          host: cfg.get('REDIS_HOST') ?? '127.0.0.1',
          port: Number(cfg.get('REDIS_PORT') ?? 6379),
        },
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: true,
          removeOnFail: 1000,
        },
      }),
    }),
    StockQueueModule,
    OrdersModule,
    WarehouseStockModule,
    ReservePackingModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
