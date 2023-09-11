import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking, SearchVehicles, Vehicles } from './interfaces/vehicles.interface';

@Injectable({
  providedIn: 'root'
})
export class CarSearchService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http:HttpClient) { }

  getAllVehicles() : Observable<Vehicles[]> {
    return this.http.get<Vehicles[]>('http://localhost:3000/car')
  }

  searchVehicles(searchBody: SearchVehicles) : Observable<Vehicles[]> {
    return this.http.post<Vehicles[]>('http://localhost:3000/car/search/booking', searchBody);
  }

  setBooking(body: Booking) : Observable<Vehicles[]> {

    return this.http.post<Vehicles[]>('http://localhost:3000/bookings', body);

  }
}
