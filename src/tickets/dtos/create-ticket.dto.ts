import { Expose, Transform } from 'class-transformer';
import { IsISO8601, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  lat: string;

  @IsString()
  lng: string;

  @IsISO8601()
  startTime: Date;

  @IsISO8601()
  endTime: Date;
}
