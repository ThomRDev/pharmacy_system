import { EmployeeEntity } from './../../employee/entities/employee.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigServer } from "../../config/config";
import { EmployeeService } from "../../employee/services/employee.service";
import { PayloadToken } from '../interfaces/auth.interface';
import * as bcrypt from "bcrypt"
export class AuthService extends ConfigServer{
  constructor(
    private readonly employeeService = new EmployeeService(),
    private readonly jwtInstance = jwt
  ){
    super()
  }
  sign = (payload : jwt.JwtPayload,secret:string,expires: any) => {
    return this.jwtInstance.sign(payload,secret, { expiresIn: expires })
  }
  generateJWT = async (employee:EmployeeEntity):Promise<{ accessToken:string,employee : EmployeeEntity }> => {
    const userConsult = await this.employeeService.findEmployeeWithRole(employee.id,employee.role)
    const payload:PayloadToken = {
      role : userConsult!.role,
      sub : userConsult!.id
    }
    delete (employee as any).password
    return {
      accessToken : this.sign(payload,this.getEnvironment("JWT_SECRET") as string,"24h"),
      employee
    }
  }
  validateEmployee = async (usernameOrEmail:string,password :string):Promise<EmployeeEntity | null> => {
    const employeeByEmail = await this.employeeService.findByEmail(usernameOrEmail)
    const employeeByUsername = await this.employeeService.findByUsername(usernameOrEmail)
    if(!employeeByEmail && !employeeByUsername) return null
    const employee = employeeByEmail ?? employeeByUsername
    const isMatch = await bcrypt.compare(password,employee!.password as string)
    return !isMatch ? null : employee
  }
}