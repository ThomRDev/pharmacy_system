import { BaseService } from "../../config/base.service";
import { EmployeeEntity } from "../entities/employee.entity";
import * as bcrypt from "bcrypt";
import { UpdateResult } from "typeorm";
import { EmployeeDTO, RoleType } from "../dtos/employee.dto";

export class EmployeeService extends BaseService<EmployeeEntity> {
  constructor(){
    super(EmployeeEntity)
  }
  create = async (body: EmployeeDTO):Promise<EmployeeEntity> => {
    const newUser = (await this.execRepository).create(body);
    const hashPass = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPass;
    return (await this.execRepository).save(newUser);
  }
  update = async (id:string,infoUpdate:EmployeeDTO):Promise<UpdateResult> => {
    const newPass = (await this.execRepository).create(infoUpdate);
    const hashPass = await bcrypt.hash(newPass.password, 10);
    newPass.password = hashPass;
    return (await this.execRepository).update(id, newPass);
  }

  findUserWithRelation = async (id:string):Promise<EmployeeEntity | null> =>{
    return (await this.execRepository)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.customer","customer")
      .where({ id })
      .getOne()
  }

  findEmployeeWithRole = async (id:string,role:RoleType):Promise<EmployeeEntity | null> => {
    return (await this.execRepository)
    .createQueryBuilder("employee")
    .where({ id })
    .andWhere({ role })
    .getOne()
  }

  async findByEmail(email: string): Promise<EmployeeEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("employee")
      .addSelect("employee.password")
      .where({ email })
      .getOne();
  }
  async findByUsername(username: string): Promise<EmployeeEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("employee")
      .addSelect("employee.password")
      .where({ username })
      .getOne();
  }
}