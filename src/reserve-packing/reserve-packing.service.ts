import { Injectable } from '@nestjs/common';
import { CreateReservePackingDto } from './dto/create-reserve-packing.dto';
import { UpdateReservePackingDto } from './dto/update-reserve-packing.dto';

@Injectable()
export class ReservePackingService {
  create(createReservePackingDto: CreateReservePackingDto) {
    return 'This action adds a new reservePacking';
  }

  findAll() {
    return `This action returns all reservePacking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservePacking`;
  }

  update(id: number, updateReservePackingDto: UpdateReservePackingDto) {
    return `This action updates a #${id} reservePacking`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservePacking`;
  }
}
