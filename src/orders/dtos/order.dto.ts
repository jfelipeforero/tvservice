import { Expose } from 'class-transformer';
import { Technician } from 'src/technicians/technician.entity';

export class OrderDto {
  @Expose()
  installationDate: Date;

  @Expose()
  technician: Technician;
}
