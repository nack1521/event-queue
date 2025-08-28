import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservePackingService } from './reserve-packing.service';
import { CreateReservePackingDto } from './dto/create-reserve-packing.dto';
import { UpdateReservePackingDto } from './dto/update-reserve-packing.dto';

@Controller('reserve-packing')
export class ReservePackingController {
  constructor(private readonly reservePackingService: ReservePackingService) {}

  @Post()
  create(@Body() createReservePackingDto: CreateReservePackingDto) {
    return this.reservePackingService.create(createReservePackingDto);
  }

  @Get()
  findAll() {
    return this.reservePackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservePackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservePackingDto: UpdateReservePackingDto) {
    return this.reservePackingService.update(+id, updateReservePackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservePackingService.remove(+id);
  }
}
