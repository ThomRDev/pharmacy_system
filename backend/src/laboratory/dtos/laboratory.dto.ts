import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class LaboratoryDTO extends BaseDTO {
  @IsNotEmpty()
  address!: string;
  
  @IsNotEmpty()
  name !:string

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  lng !: string

  @IsNotEmpty()
  lat !: string
}