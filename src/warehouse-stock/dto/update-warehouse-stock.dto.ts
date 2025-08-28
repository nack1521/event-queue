import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseStockDto } from './create-warehouse-stock.dto';

export class UpdateWarehouseStockDto extends PartialType(CreateWarehouseStockDto) {}
