import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/car/cars/booking.interface';
import { SearchDto } from 'src/car/dto/search-car.dto';
import { BookingDto } from 'src/car/dto/booking.dto';

@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingService: BookingsService) {}

    @Post()
    create(@Body() booking: BookingDto) {
        return this.bookingService.create(booking);
    }
    
    @Get()
    findAll(): Booking[] {
        return this.bookingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Booking {
    return this.bookingService.findOne(+id);
  }


}
