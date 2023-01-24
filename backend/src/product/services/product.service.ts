import { UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductDTO } from "../dtos/product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductService extends BaseService<ProductEntity>{
  constructor(){
    super(ProductEntity)
  }
  async create(body: ProductDTO): Promise<ProductEntity> {
    return (await this.execRepository).save(body);
  }
  async update(
    id: string,
    infoUpdate: ProductDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async findByName(name: string): Promise<ProductEntity[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("product")
      .innerJoinAndSelect("product.laboratory","laboratory")
      .where("product.name like :name", {
        name: `%${name}%`,
      })
      .getMany();
  }
  async findAll(): Promise<ProductEntity[]> {
    return (await this.execRepository).find({
      relations :{
        laboratory : true
      }
    });
  }
  async findByID(id:string):Promise<ProductEntity | null>{
    return (await this.execRepository).createQueryBuilder("product")
    .innerJoinAndSelect("product.laboratory","laboratory")
    .where("product.id like :id", {
      id,
    })
    .getOne();
  }

  async verifyProduct(id:string,quantity:number):Promise<ProductEntity | null>{
    return (await this.execRepository).query(`
      SELECT id,name,price,${quantity} as quantity,CONVERT(${quantity}*stock,INT) as total FROM product WHERE id = '${id}' AND stock - ${quantity} > 0
    `)
  }


  async updateStock(id:string,quantity:number):Promise<UpdateResult>{
    return (await this.execRepository).createQueryBuilder("product")
      .update()
        .set({
          stock: () => `stock - ${quantity}`
        })
        .where("id = :id", { id })
      .execute()
  }
}