export interface Vehicles {
    vin: string;
    make: string;
    model: string;
    price: string;
}

export interface SearchVehicles {
    make: string|null|undefined;
    model: string|null|undefined;
    price: string|null|undefined;
    startDate: string|null|undefined;
    endDate: string|null|undefined;
}
export interface Booking {
    vin: string|null|undefined;
    startDate: string|null|undefined;
    endDate: string|null|undefined;
}   