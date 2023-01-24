import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class BaseUserEntity extends BaseEntity {
  
  @Column({ length:500 })
  @IsNotEmpty()
  firstname!:string
  
  @Column({ length:500 })
  @IsNotEmpty()
  lastname!:string

  @Column({ length:500 })
  @IsNotEmpty()
  email!:string

  @Column()
  @IsNotEmpty()
  age!:number

  @Column({ length:8 })
  @IsNotEmpty()
  dni!:string
}