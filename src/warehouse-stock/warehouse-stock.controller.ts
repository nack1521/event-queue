import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehouseStockService } from './warehouse-stock.service';
import { CreateWarehouseStockDto } from './dto/create-warehouse-stock.dto';
import { UpdateWarehouseStockDto } from './dto/update-warehouse-stock.dto';

@Controller('warehouse-stock')
export class WarehouseStockController {
  constructor(private readonly warehouseStockService: WarehouseStockService) {}

  @Post()
  create(@Body() createWarehouseStockDto: CreateWarehouseStockDto) {
    return this.warehouseStockService.create(createWarehouseStockDto);
  }

  @Get()
  findAll() {
    return this.warehouseStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseStockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseStockDto: UpdateWarehouseStockDto) {
    return this.warehouseStockService.update(+id, updateWarehouseStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseStockService.remove(+id);
  }
}
