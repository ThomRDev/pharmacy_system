import { DeleteResult, EntityTarget, FindOptionsWhere, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<T>>;
  constructor(private getEntity: EntityTarget<T>) {
    super();
    this.execRepository = this.initRepository(getEntity);
  }

  async initRepository<T extends Object>(e: EntityTarget<T>): Promise<Repository<T>> {
    const getConn = await this.initConnect;
    return getConn.getRepository(e);
  }
  async findAll(): Promise<T[]> {
    return (await this.execRepository).find();
  }
  async findByID(id:string):Promise<T | null>{
    return (await this.execRepository).findOneBy({ id } as FindOptionsWhere<T>)
    // return (await this.execRepository).createQueryBuilder("select * from balbalba")
  }
  async delete(id:string):Promise<DeleteResult>{
    return (await this.execRepository).delete({ id } as FindOptionsWhere<T>)
    // return (await this.execRepository).createQueryBuilder("select * from balbalba")
  }

}