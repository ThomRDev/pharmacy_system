import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { PurchaseDetailService } from "../../purchase/services/purchase-detail.service";
import { HttpResponse } from "../../shared/response/http.response";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse = new HttpResponse(),
    private readonly purchaseDetailService = new PurchaseDetailService()
  ){}
  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findByID(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async findProductsByName(req: Request, res: Response) {
    const { search} = req.query;
    try {
      if (search !== undefined) {
        const data = await this.productService.findByName(search as string);
        if (!data) {
          return this.httpResponse.NotFound(res, "No existe dato");
        }
        return this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.create(req.body);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.productService.update(
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
  async deleteProduct(req: Request, res: Response) {
    console.log('entre');
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.productService.delete(id);
      if (!data.affected) {
        console.log(data);
        return this.httpResponse.NotFound(res, "Hay un error en borrar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async getMostSelledProducts(req: Request, res: Response){
    try{
      const data = await this.purchaseDetailService.getAllReferencedProducts()
      if(!data) return this.httpResponse.NotFound(res, "No existe dato");
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}