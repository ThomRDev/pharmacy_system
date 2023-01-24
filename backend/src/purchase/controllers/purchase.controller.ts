import { PurchaseDetailEntity } from './../entities/purchase_detail.entity';
import { PurchaseEntity } from './../entities/purchase.entity';
import { Request, Response } from "express";
import { EmployeeEntity } from "../../employee/entities/employee.entity";
import { ProductService } from "../../product/services/product.service";
import { HttpResponse } from "../../shared/response/http.response";
import { PurchaseService } from "../services/purchase.service";
import { PurchaseDetailService } from '../services/purchase-detail.service';
import { CustomerService } from '../../customer/services/customer.service';
export interface EmployeePostRequest extends Request{
  employee ?: EmployeeEntity
  auth ?:EmployeeEntity
}
export class PurchaseController {
  constructor(
    private readonly purchaseService = new PurchaseService(),
    private readonly httpResponse = new HttpResponse(),
    private readonly productService = new ProductService(),
    private readonly purchaseDetailService = new PurchaseDetailService(),
    private readonly customerService = new CustomerService()
  ){}
  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No hay ventas registradas");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findByID(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe la venta");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async createPurchase(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.create(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.update(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.delete(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  
  async generatePurchase(req: EmployeePostRequest, res: Response){
    try{
      const { products,description,paymentMethod,customerId } = req.body
      const employee = req.auth as EmployeeEntity

      const productsPromise = []
      for (const product of products) {
        productsPromise.push(this.productService.verifyProduct(product.id,product.quantity))
      }
      
      const productsResponse = await Promise.all(productsPromise)
      
      for (const productArr of productsResponse) {
        if(!(productArr as any).length) throw new Error("Error al encontrar un producto")
      }

      // crear purchase amount general
      const amount = productsResponse.reduce((acc,curr:any)=>{
        return acc + Number(curr[0].total)
      },0)
      
      const customer = await this.customerService.findByID(customerId)
      if(!customer) throw new Error("El cliente no existe")

      const purchaseResponse = await this.purchaseService.create({
        amount,
        description,
        paymentMethod,
        customer,
        employee
      } as PurchaseEntity)

      // crear puchases detail
      const purchaseDetail = []
      for (const product of productsResponse) {
        purchaseDetail.push(this.purchaseDetailService.create({
          product:(product as any)[0]["id"],
          purchase:purchaseResponse.id as any,
          quantityProduct:(product as any)[0]["quantity"],
          totalPrice:(product as any)[0]["total"],
        } as PurchaseDetailEntity))
      }
      await Promise.all(purchaseDetail)
      
      // actualizar los producto
      const updateStock = []
      for (const product of productsResponse) {
        updateStock.push(this.productService.updateStock((product as any)[0]["id"] as string,(product as any)[0]["quantity"]))
      }
      await Promise.all(updateStock)

      return this.httpResponse.Ok(res, "Venta realizada con exito, monto total S/"+amount);
    }catch(e){
      return this.httpResponse.Error(res, (e as Error).message);
    }
  }
}