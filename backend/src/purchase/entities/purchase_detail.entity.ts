import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "./purchase.entity";

@Entity({ name : "purchase_detail" })
export class PurchaseDetailEntity extends BaseEntity{

  @ManyToOne(()=>PurchaseEntity,(purchase)=>purchase.purchaseDetail)
  @JoinColumn({ name: "purchase_id" })
  purchase!:PurchaseEntity

  @ManyToOne(()=>ProductEntity,(product)=>product.purchaseDetail)
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;

  @Column()
  quantityProduct!: number;

  @Column()
  totalPrice!: number;
}