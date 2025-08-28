import { Module } from '@nestjs/common';
import { WarehouseStockService } from './warehouse-stock.service';
import { WarehouseStockController } from './warehouse-stock.controller';

@Module({
  controllers: [WarehouseStockController],
  providers: [WarehouseStockService],
})
export class WarehouseStockModule {}
