import { EmployeePostRequest } from './../controllers/auth.controller';
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { AuthService } from "../services/auth.service";

export class AuthMiddleware extends SharedMiddleware {
  constructor(
    private authService = new AuthService()
  ){
    super();
  }

  async validateRequest(req:EmployeePostRequest,res:Response,next:NextFunction){
    try{
      const { username , password } = req.body
      const employee = await this.authService.validateEmployee(username,password)
      if(!employee) return this.httpResponse.NotFound(res,"username y/o password incorrectos")
      req.employee = employee
      next()
    }catch(err){
      return this.httpResponse.Error(res,(err as Error).message)
    }
  }
}