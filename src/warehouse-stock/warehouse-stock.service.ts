import { Injectable } from '@nestjs/common';
import { CreateWarehouseStockDto } from './dto/create-warehouse-stock.dto';
import { UpdateWarehouseStockDto } from './dto/update-warehouse-stock.dto';

@Injectable()
export class WarehouseStockService {
  create(createWarehouseStockDto: CreateWarehouseStockDto) {
    return 'This action adds a new warehouseStock';
  }

  findAll() {
    return `This action returns all warehouseStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouseStock`;
  }

  update(id: number, updateWarehouseStockDto: UpdateWarehouseStockDto) {
    return `This action updates a #${id} warehouseStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouseStock`;
  }
}
