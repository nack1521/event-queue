import { PartialType } from '@nestjs/mapped-types';
import { CreateReservePackingDto } from './create-reserve-packing.dto';

export class UpdateReservePackingDto extends PartialType(CreateReservePackingDto) {}
