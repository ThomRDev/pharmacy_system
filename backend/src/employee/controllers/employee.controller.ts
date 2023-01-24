import { Request, Response } from "express"
import { DeleteResult, UpdateResult } from "typeorm"
import { HttpResponse } from "../../shared/response/http.response"
import { EmployeeService } from "../services/employee.service"

export class EmployeeController {
  constructor(
    private readonly httpResponse = new HttpResponse(),
    private readonly employeeService = new EmployeeService()
  ){}
  
  getEmployees = async (req:Request,res:Response) => {
    try {
      const users = await this.employeeService.findAll()

      if(!users.length) return this.httpResponse.NotFound(res,"No existen empleados registrados")

      return this.httpResponse.Ok(res,users)
    } catch (error) {
      return this.httpResponse.Error(res,error)
    }
  }

  getEmployeeById = async (req:Request,res:Response) => {
    const { id } = req.params
    try {
      const data = await this.employeeService.findByID(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe el empleado con el id "+id);
      }
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
  create = async (req:Request,res:Response) => {
    try {
      const data = await this.employeeService.create(req.body)
      delete (data as any).password 
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
  
  update = async (req:Request,res:Response) => {
    const { id } = req.params
    try {
      const data :UpdateResult = await this.employeeService.update(id,req.body)
      if(!data.affected) return this.httpResponse.NotFound(res,"Error al actualizar")
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }

  delete = async (req:Request,res:Response) => {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.employeeService.delete(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (error) {
      return this.httpResponse.Error(res, error);
    }
  }
}