import { Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UpdateCarDto } from './dto/update-car.dto';
import { Vehicles } from './cars/vehicle.interface';
import { data } from './mock-data/vehicles.data';
import { SearchDto } from './dto/search-car.dto';
import { SearchWABDto } from './dto/search-wab.dto';
import { BookingsService } from 'src/bookings/bookings.service';
import { Booking } from './cars/booking.interface';

@Injectable()
export class CarService {

  private vehicles: Array<Vehicles> = data;
  private readonly logger = new Logger(CarService.name);

  public constructor(private bookingService:BookingsService) {}

  create(vehicle: Vehicles) {
     // if vin is already in use by another vehicle
    const vehicleExists: boolean = this.vehicles.some(
        (veh) => veh.vin === vehicle.vin );
    if (vehicleExists) {
        throw new UnprocessableEntityException('vehicle vin already exists.');
    }

  
    const vehicleNew: Vehicles = {
      ...vehicle,
    };

    this.vehicles.push(vehicleNew);
    console.log('Vehicles',this.vehicles);

    return vehicleNew;

  }

  findAll(): Vehicles[] {
    
    this.logger.log('Returning all vehicles');
    return this.vehicles;
  }

  findOne(vin: string): Vehicles {
    const veh: Vehicles = this.vehicles.find(vehicle => vehicle.vin === vin);

    if (!veh) {
      throw new NotFoundException('vehicle not found.');
    }

    return veh;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }

  search(search: SearchDto) : Vehicles[]{

    const isMake = search.make ? true : false;
    const isModel = search.model ? true : false;
    const isPrice = search.price ? true : false;
    let vehMake: Vehicles[] = []
    if (isMake) {
      vehMake = this.vehicles.filter(x=>x.make === search.make);
    }
    if (isModel) {
      vehMake = vehMake.length > 0 ? vehMake.filter(x=>x.model === search.model)
      :this.vehicles.filter(x=>x.model === search.model);
    }
    if (isPrice) {
      vehMake = vehMake.length > 0 ? vehMake.filter(x=>x.price === search.price)
      :this.vehicles.filter(x=>x.price === search.price);
    }

  if (vehMake.length === 0) {
      throw new UnprocessableEntityException('No Vehicle Found');
  } 

  //check booking available 

    return vehMake;
  }

  searchWithAvailableBooking(searchWAB: SearchWABDto):Vehicles[] {

    const availableVehicles = this.search(searchWAB);
    this.logger.log('Returning all vehicles',availableVehicles);
    let availableVehiclesForBooking : Vehicles[];
    if (availableVehicles.length > 0) {
       availableVehiclesForBooking = availableVehicles.filter(x=>{
        this.logger.log('Vehicle finding',x);
        const isBookingFound =  this.bookingService.findAll().find(book=>book.vin === x.vin);
        if (!isBookingFound) {
          return x;
        }
        return false;
       })   
    }
    return availableVehiclesForBooking;
  }
}
