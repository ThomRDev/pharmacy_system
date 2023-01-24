import { BaseRouter } from "../shared/router/router";
import { EmployeeController } from "./controllers/employee.controller";
import { EmployeeMiddleware } from "./middlewares/employee.middleware";

export class EmployeeRouter extends BaseRouter<EmployeeController,EmployeeMiddleware> {
  constructor(){
    super(EmployeeController,EmployeeMiddleware)
  }
  routes(): void {
    this.router.post("/employees/create",[
      this.middleware.validateJWT.bind(this.middleware),
      this.middleware.isAdminRole.bind(this.middleware),
      this.middleware.employeeValidator.bind(this.middleware)
    ],this.controller.create.bind(this.controller))
    
    this.router.get("/employees",[this.middleware.validateJWT.bind(this.middleware)],this.controller.getEmployees.bind(this.controller))
  }
}