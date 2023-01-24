import { LaboratoryEntity } from './../entities/laboratory.entity';
import { BaseService } from "../../config/base.service";
import { LaboratoryDTO } from '../dtos/laboratory.dto';
import { UpdateResult } from 'typeorm';

export class LaboratoryService extends BaseService<LaboratoryEntity>{
  constructor(){
    super(LaboratoryEntity)
  }
  async create(body: LaboratoryDTO): Promise<LaboratoryEntity> {
    return (await this.execRepository).save(body);
  }

  async update(
    id: string,
    infoUpdate: LaboratoryDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}