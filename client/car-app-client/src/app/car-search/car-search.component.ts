import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarSearchService } from '../car-search.service';
import { Vehicles } from '../interfaces/vehicles.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent {
  public vehicleData$ : Observable<Vehicles[]> | undefined;
  public errorMessage:string = '';

  constructor(private fb: FormBuilder, private carSearchService: CarSearchService) { }

  searchForm = this.fb.group({
    vin:[''],
    make: [''],
    model: [''],
    price:[''],
    startDate:['', Validators.required],
    endDate:['', Validators.required]
  });

  get rFormControls() { return this.searchForm.controls};

  onSubmit() {
    const body = {
      make:this.searchForm.value.make,
      model:this.searchForm.value.model,
      price:this.searchForm.value.price,
      startDate:this.searchForm.value.startDate,
      endDate:this.searchForm.value.endDate
    };
    this.errorMessage = ''
    this.vehicleData$ = this.carSearchService.searchVehicles(body)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        console.log('error caught in service')
        console.error(err.error.message[0]);
        this.errorMessage = err.error.message[0];
        return throwError(()=>err);
      }));//.subscribe(x=>console.log(x));
    console.warn(this.searchForm.value);
  }

  getAllVehicles() {
    this.errorMessage = '';
    this.vehicleData$ = this.carSearchService.getAllVehicles();
  }

  getBooking() {
    const body = {
      vin:this.searchForm.value.vin,
      startDate:this.searchForm.value.startDate,
      endDate:this.searchForm.value.endDate
    };
    console.log('Booking ....', body);
    this.vehicleData$ = this.carSearchService.setBooking(body)
    .pipe(
      tap((x)=>console.log(x)),
      catchError((err:HttpErrorResponse) => {
        console.log('error caught in service')
        console.error(err.error.message);
        this.errorMessage = err.error.message;
        return throwError(()=>err);
      }));//.subscribe(x=>console.log(x));
    console.warn(this.searchForm.value);
  }

  getAllBooking() {
  }  

}
