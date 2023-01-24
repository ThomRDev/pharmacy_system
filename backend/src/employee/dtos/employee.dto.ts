import { IsNotEmpty, IsString } from "class-validator";
import { BaseUserDTO } from "../../config/baseUser.dto";

export class EmployeeDTO extends BaseUserDTO{
  @IsNotEmpty()
  @IsString()
  username !: string
  
  @IsNotEmpty()
  @IsString()
  password !:string
  
  @IsNotEmpty()
  @IsString()
  role !:RoleType
}

export enum RoleType {
  ADMIN    = "ADMIN",
  SELLER   = "SELLER",
  CASHIER  = "CASHIER"
}