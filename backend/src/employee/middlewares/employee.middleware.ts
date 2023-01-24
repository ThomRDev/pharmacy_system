import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { EmployeeDTO } from "../dtos/employee.dto";

export class EmployeeMiddleware extends SharedMiddleware {
  constructor(){
    super();
  }

  async employeeValidator(req:Request,res:Response,next:NextFunction){

    const { firstname,lastname,age,email,dni,role,password,username } = req.body

    const valid = new EmployeeDTO()
    valid.firstname = firstname;
    valid.lastname = lastname;
    valid.username = username;
    valid.email = email;
    valid.password = password;
    valid.age = age
    valid.role = role;
    valid.dni = dni;

    const error = await validate(valid)
    if(!error.length) return next()
    return this.httpResponse.Error(res,error)
  }
}