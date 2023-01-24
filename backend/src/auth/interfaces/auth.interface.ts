import { RoleType } from "../../employee/dtos/employee.dto";

export interface PayloadToken {
  role: RoleType,
  sub : string
}