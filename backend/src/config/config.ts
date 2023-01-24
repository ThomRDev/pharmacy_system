import { DataSource } from 'typeorm';
import dotenv from "dotenv"
import { AppDataSource } from './data.source';

export abstract class ConfigServer {
  constructor(){
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
      path : nodeNameEnv
    })
  }
  public getEnvironment(name:string):string | undefined{
    return process.env[name]
  }

  public getNumberEnv(name:string):number{
    return Number(this.getEnvironment(name))
  }

  public get nodeEnv():string{
    return this.getEnvironment("NODE_ENV")?.trim() || ""
    // return this.getEnvironment("NODE_ENV")?.trim() || "development"
  }

  public createPathEnv(path:string):string{
    const arrEnv = ["env"]

    if(path.length > 0){
      const stringToArray = path.split(".")
      arrEnv.unshift(...stringToArray)
    }
    return `.${arrEnv.join(".")}`
  }

  get initConnect(): Promise<DataSource> {
    return AppDataSource.initialize();
  }

}