import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { LaboratoryEntity } from "../../laboratory/entities/laboratory.entity"
import { PurchaseDetailEntity } from "../../purchase/entities/purchase_detail.entity"

@Entity({ name : "product" })
@Unique(["name"])
export class ProductEntity extends BaseEntity{
  
  @Column()
  name !: string
  
  @Column()
  therapeutic_description !: string
  
  @Column()
  price !: number

  @Column()
  stock !: number
  
  @Column()
  expiration_date !:Date

  @ManyToOne(()=>LaboratoryEntity,(laboratory)=>laboratory.products)
  @JoinColumn({ name : "laboratory_id" })
  laboratory!:LaboratoryEntity

  @OneToMany(()=>PurchaseDetailEntity,(purchaseDetail)=>purchaseDetail.product)
  purchaseDetail!:PurchaseDetailEntity
}