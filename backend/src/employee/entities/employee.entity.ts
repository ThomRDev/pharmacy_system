import { Column, Entity, OneToMany, Unique } from "typeorm";
import { BaseUserEntity } from "../../config/baseUser.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { RoleType } from "../dtos/employee.dto";

@Entity({
  name  :"employee"
})
@Unique(["username","email","dni"])
export class EmployeeEntity extends BaseUserEntity{

  @Column({ length:250 })
  username !: string
  
  @Column({ select : false })
  password !:string
  
  @Column({ type: "enum", enum: RoleType, nullable: false })
  role!: RoleType;


  @OneToMany(()=>PurchaseEntity,(purchase)=>purchase.employee)
  purchases!:PurchaseEntity[]
}

