import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseStockService } from './warehouse-stock.service';
import { WarehouseStockController } from './warehouse-stock.controller';
import { WarehouseStock, WarehouseStockSchema } from './schemas/warehouse-stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WarehouseStock.name, schema: WarehouseStockSchema }]),
  ],
  controllers: [WarehouseStockController],
  providers: [WarehouseStockService],
  exports: [WarehouseStockService],
})
export class WarehouseStockModule {}