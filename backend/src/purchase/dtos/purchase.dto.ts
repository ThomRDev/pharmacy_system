import { EmployeeEntity } from './../../employee/entities/employee.entity';
import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  description!: string;
  
  @IsNotEmpty()
  amount!: number;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;
  
  @IsNotEmpty()
  employee!: EmployeeEntity;
}