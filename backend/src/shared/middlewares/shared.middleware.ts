import { EmployeeService } from './../../employee/services/employee.service';
import { NextFunction, Request, Response } from "express";
import { ConfigServer } from "../../config/config";
import { HttpResponse } from "../response/http.response";
import jwt from "jsonwebtoken"
import { EmployeeEntity } from '../../employee/entities/employee.entity';
import { RoleType } from '../../employee/dtos/employee.dto';

export interface IGetEmployeeAuthInfoRequest extends Request {
  auth?: EmployeeEntity
}
export class SharedMiddleware extends ConfigServer{
  constructor(
    public httpResponse = new HttpResponse(),
    public employeeService = new EmployeeService()
  ){
    super()
  }

  async validateJWT(req:IGetEmployeeAuthInfoRequest,res:Response,next:NextFunction){
    const headerToken = req.headers.authorization;
    
    if(!headerToken) return this.httpResponse.Unauthorized(res,"Token es requerido")
    const token = headerToken.replace("Bearer ","")
    try{
      // decode vs verify ???
      const { sub } = jwt.verify(token,this.getEnvironment("JWT_SECRET") as string)
      const authenticatedEmployee = await this.employeeService.findByID(sub as string)
      if(!authenticatedEmployee) throw new Error("El usuario authenticado es incorrecto")
      req.auth = authenticatedEmployee
      next()
    }catch(err){
      return this.httpResponse.Unauthorized(res,`Token no valido ${(err as Error).message}`)
    }
  }
  
  async isAdminRole(req:IGetEmployeeAuthInfoRequest,res:Response,next:NextFunction){
    if(!req.auth) return this.httpResponse.Error(res,"Se esta verificando el rol sin validar el JWT")
    const { role } = req.auth
    if(role != RoleType.ADMIN) return this.httpResponse.Unauthorized(res,"El employee authenticado no tiene permisos para esta acción")
    next()
  }
}