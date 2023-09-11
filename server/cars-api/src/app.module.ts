import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { BookingsModule } from './bookings/booking.module';

@Module({
  imports: [CarModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
