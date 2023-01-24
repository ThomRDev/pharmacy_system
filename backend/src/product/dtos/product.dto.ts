import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { LaboratoryEntity } from "../../laboratory/entities/laboratory.entity";

export class ProductDTO extends BaseDTO {
  @IsNotEmpty()
  name !: string
  
  @IsNotEmpty()
  stock!: number

  @IsNotEmpty()
  price !:number
  
  @IsNotEmpty()
  expiration_date !:Date
  
  @IsNotEmpty()
  therapeutic_description !:string

  @IsNotEmpty()
  laboratory!: LaboratoryEntity
}