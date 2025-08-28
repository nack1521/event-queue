import { Module } from '@nestjs/common';
import { ReservePackingService } from './reserve-packing.service';
import { ReservePackingController } from './reserve-packing.controller';

@Module({
  controllers: [ReservePackingController],
  providers: [ReservePackingService],
})
export class ReservePackingModule {}
