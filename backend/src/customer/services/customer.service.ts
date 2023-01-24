import { BaseService } from "../../config/base.service";
import { CustomerEntity } from "../entities/customer.entity";

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }
}