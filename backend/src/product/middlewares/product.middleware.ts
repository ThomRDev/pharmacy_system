import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { ProductDTO } from "../dtos/product.dto";

export class ProductMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  productValidator(req: Request, res: Response, next: NextFunction) {
    const { name, stock, price, expiration_date,therapeutic_description,laboratory } = req.body;

    const valid = new ProductDTO();
    valid.name = name;
    valid.stock = stock;
    valid.expiration_date = expiration_date;
    valid.price = price;
    valid.therapeutic_description = therapeutic_description;
    valid.laboratory = laboratory;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}