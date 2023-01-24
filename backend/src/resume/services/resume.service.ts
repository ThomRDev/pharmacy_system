import { Repository } from "typeorm";
import { ConfigServer } from "../../config/config";

export class ResumeService extends ConfigServer {
  public execRepository: Promise<Repository<any>>;
  constructor() {
    super();
    this.execRepository = this.initRepository();
  }
  async initRepository(): Promise<Repository<any>> {
    const getConn = await this.initConnect;
    return getConn.getRepository({} as any);
  }
  async getResume(){
    const repo = await this.execRepository
    const customers = repo.query(`SELECT COUNT(*) as Clientes FROM customer`)
    const employees = repo.query(`SELECT COUNT(*) as Empleados FROM employee`)
    const laboratories = repo.query(`SELECT COUNT(*) as Laboratorios FROM laboratory`)
    const products = repo.query(`SELECT COUNT(*) as Productos FROM product`)
    const purchases = repo.query(`SELECT COUNT(*) as Compras FROM purchase`)

    return Promise.all([customers,employees,laboratories,products,purchases])
  }
}