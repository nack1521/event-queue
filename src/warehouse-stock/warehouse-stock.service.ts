import { Injectable } from '@nestjs/common';
import { CreateWarehouseStockDto } from './dto/create-warehouse-stock.dto';
import { UpdateWarehouseStockDto } from './dto/update-warehouse-stock.dto';
import { WarehouseStock, WarehouseStockDocument } from './schemas/warehouse-stock.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WarehouseStockService {
  constructor(
    @InjectModel(WarehouseStock.name) private warehouseStockModel: Model<WarehouseStockDocument>,
  ) {}

  async create(createWarehouseStockDto: CreateWarehouseStockDto): Promise<WarehouseStock> {
    const createdStock = new this.warehouseStockModel(createWarehouseStockDto);
    return await createdStock.save();
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
