import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { EmployeeEntity } from "../../employee/entities/employee.entity";
import { PurchaseDetailEntity } from "./purchase_detail.entity";

@Entity({ name : "purchase" })
export class PurchaseEntity extends BaseEntity{
  @Column()
  description!: string;
  
  @Column()
  amount!: number;

  @Column()
  paymentMethod!: string;
  
  @ManyToOne(()=>CustomerEntity,(customer)=>customer.purchases)
  @JoinColumn({ name :"customer_id" })
  customer!: CustomerEntity;
  
  @ManyToOne(()=>EmployeeEntity,(employee)=>employee.purchases)
  @JoinColumn({ name :"employee_id" })
  employee!: EmployeeEntity;

  @OneToMany(()=>PurchaseDetailEntity,(purchaseDetail)=>purchaseDetail.purchase)
  purchaseDetail!:PurchaseDetailEntity

}