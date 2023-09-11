# Project Car-APP-New

Few points about Project

Project has two folder `Client` and `Server`

`Client` has Angular code, for simplicity, created one page as follows:
    
    -- List of Input fields like vin/make/model/price/start/end dates
    -- 1. Button Submit form, you need to fill dates which mandatory and like 'Toyota' in make field to appear Toyota available cars
       for bookings 
       2. Button getAllVehicles will bring all vehicles to see what we are renting
       3. Booking to make a booking from getVehicle list, you need to enter Vin and start/end dates to book a car, if its already exist 
       then a message will appear about already exist.

    There are other feature but its not activated because of time constraints

    To activate angular app from client-car-app, `npm start` 

`Server` Nest code as follows:

     -- Simple Nest Back end api like Controller of Vehicles and Booking
     -- Services for Vehicles and booking
     -- DTO's to validate 
     -- to get all vehicles get http://localhost:3000/car
     -- to make booking post  http://localhost:3000/bookings with body vin/start/end dates 
     -- to serach by combinition of make/mode/price post http://localhost:3000/car/search make/mode/price
     -- to search for  booking post  http://localhost:3000/car/search/booking make/model/price/start/end date 
     -- get one vehicle get http://localhost:3000/car/:vin 
     -- I think same for booking 

     to active from cars-api, npm run start 

     


