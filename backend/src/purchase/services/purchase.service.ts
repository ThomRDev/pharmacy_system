import { UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity>{
  constructor(){
    super(PurchaseEntity)
  }
  async create(body: PurchaseEntity): Promise<PurchaseEntity> {
    return (await this.execRepository).save(body);
  }
  async update(
    id: string,
    infoUpdate: PurchaseEntity
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}