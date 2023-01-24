import { UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseDetailEntity } from "../entities/purchase_detail.entity";

export class PurchaseDetailService extends BaseService<PurchaseDetailEntity>{
  constructor(){
    super(PurchaseDetailEntity)
  }
  async create(body: PurchaseDetailEntity): Promise<PurchaseDetailEntity> {
    return (await this.execRepository).save(body);
  }
  async update(
    id: string,
    infoUpdate: PurchaseDetailEntity
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async getAllReferencedProducts(){
    return (await this.execRepository)
    .query(`
      SELECT sum(pd.quantity_product) AS vendido,p.name AS name,p.price AS precio 
        FROM purchase_detail AS pd 
        INNER JOIN product AS p ON p.id = pd.product_id GROUP BY pd.product_id ORDER BY vendido DESC
    `)
  }
}