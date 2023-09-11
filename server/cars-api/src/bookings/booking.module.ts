import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { CarModule } from 'src/car/car.module';
import { CarService } from 'src/car/car.service';

@Module({
  //imports: [CarModule],
  controllers: [BookingsController],
  providers: [BookingsService, CarService],
})
export class BookingsModule {}