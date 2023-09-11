import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { BookingsModule } from 'src/bookings/booking.module';
import { BookingsService } from 'src/bookings/bookings.service';

@Module({
  imports: [BookingsModule],
  controllers: [CarController],
  providers: [CarService, BookingsService],
})
export class CarModule {}
