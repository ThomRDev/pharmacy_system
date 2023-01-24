import { Entity, OneToMany, Unique } from "typeorm";
import { BaseUserEntity } from "../../config/baseUser.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({
  name  :"customer"
})
@Unique(["email","dni"])
export class CustomerEntity extends BaseUserEntity{
  @OneToMany(()=>PurchaseEntity,(purchase)=>purchase.customer)
  purchases!:PurchaseEntity[]
}