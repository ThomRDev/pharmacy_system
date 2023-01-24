import { EmployeeEntity } from './../../employee/entities/employee.entity';
import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { AuthService } from "../services/auth.service";

export interface EmployeePostRequest extends Request{
  employee ?: EmployeeEntity
  auth ?:EmployeeEntity
}

export class AuthController{
  constructor(
      private readonly authService = new AuthService(),
      private readonly httpResponse = new HttpResponse()
  ){}
  
  async login(req:EmployeePostRequest,res:Response){
    try {

      const employeeEncode = req.employee as EmployeeEntity
      const encode = await this.authService.generateJWT(employeeEncode)
      res.header("Content-Type", "application/json");
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
      res.write(JSON.stringify({
        ...encode,
        ok : true
      }));
      res.end();
    } catch (error) {
      return this.httpResponse.Error(res,(error as Error).message)
    }
  }


  async checking(req:EmployeePostRequest,res:Response){
    const employeeEncode = req.auth as EmployeeEntity
    return this.httpResponse.Ok(res,employeeEncode)
  }
}