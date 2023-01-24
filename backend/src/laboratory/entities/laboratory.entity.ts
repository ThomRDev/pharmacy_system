import { Column, Entity, OneToMany, Unique } from "typeorm"
import { BaseEntity } from "../../config/base.entity"
import { ProductEntity } from "../../product/entities/product.entity"

@Entity({ name : "laboratory" })
@Unique(["name"])
export class LaboratoryEntity extends BaseEntity{
  @Column()
  address !: string
  
  @Column()
  description !: string
  
  @Column()
  name !: string

  @Column()
  lng !: string

  @Column()
  lat !: string
  

  @OneToMany(()=>ProductEntity,(product)=>product.laboratory)
  products!:ProductEntity[]
}