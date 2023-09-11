import { Inject, Injectable, Logger, NotFoundException, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { Booking } from 'src/car/cars/booking.interface';
import { Vehicles } from 'src/car/cars/vehicle.interface';
import { SearchDto } from 'src/car/dto/search-car.dto';
import { data } from 'src/car/mock-data/vehicles.data';

@Injectable()
export class BookingsService {

    private bookings: Array<Booking> = [];
    private readonly logger = new Logger(BookingsService.name);

    public constructor(
        @Inject(forwardRef(() =>CarService))
        private carService: CarService){}
  
    create(booking: Booking) {
        const vehicleExist = this.carService.findOne(booking.vin);
        if (!vehicleExist){
                throw new UnprocessableEntityException('vehicle not available or VIN not found');
        }    
        // if booking is already in use by another vehicle
        const bookingExists: boolean = this.bookings.some(
                (book) => book.vin === booking.vin && ((booking.startDate >= book.startDate && booking.startDate <= book.endDate) 
                || (booking.endDate <= book.endDate && booking.endDate >= book.startDate))  
                 );
        if (bookingExists) { 
                throw new UnprocessableEntityException('Already booked vehicle not available.');
        }
       
   
        // find the next id 
        const maxId: number = Math.max(...this.bookings.map((book) => book.id), 0);
        const id: number = maxId + 1;
     
       const bookingNew: Booking = {
         ...booking,
         id
       };

       this.bookings.push(bookingNew);
       console.log('Bookings....',this.bookings);

    return [bookingNew];
   
}

    findAll(): Booking[] {
    
    this.logger.log('Returning all bookings');
    return this.bookings;
    }

    findOne(bookingId: number): Booking {
    const booking: Booking = this.bookings.find(book => book.id === bookingId);
    
    if (!booking) {
      throw new NotFoundException('No booking found.....');
    }

    return booking;
  }

}
