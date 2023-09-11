import { IsDate, IsNotEmpty, IsOptional, MaxDate, MinDate, ValidateBy, ValidationArguments, ValidationOptions, buildMessage } from "class-validator";
import { Booking } from "../cars/booking.interface";
import { Transform } from "class-transformer";



export const IsAfter = (property: string, options?: ValidationOptions): PropertyDecorator =>
  ValidateBy(
    {
      name: 'IsAfter',
      constraints: [property],
      validator: {
        validate: (value: Date, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName] as Date
          return value.toISOString() > relatedValue.toISOString()
        },
        defaultMessage: buildMessage((each: string): string => each + '$property must be after $constraint1', options),
      },
    },
    options,
  )
export class BookingDto implements Booking {
    
    @IsOptional()
    id: number;
    @IsNotEmpty()
    vin: string;
    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    @MinDate(new Date())
    startDate: string;
    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @IsAfter('startDate')
    @IsDate()
    endDate: string;
}
