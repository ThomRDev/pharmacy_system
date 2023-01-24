import { IsNotEmpty} from "class-validator"
import { BaseDTO } from "./base.dto";

export class BaseUserDTO extends BaseDTO{
  @IsNotEmpty()
  firstname!:string
  
  @IsNotEmpty()
  lastname!:string

  @IsNotEmpty()
  email!:string

  @IsNotEmpty()
  age!:number

  @IsNotEmpty()
  dni!:string
}