import { IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../../product/entities/product.entity";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseDetailDTO extends BaseDTO {

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;
}