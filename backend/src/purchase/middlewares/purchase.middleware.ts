import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { PurchaseDTO } from "../dtos/purchase.dto";

export class PurchaseMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  purchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { description, paymentMethod, customer,amount,employee } = req.body;

    const valid = new PurchaseDTO();
    valid.paymentMethod = paymentMethod;
    valid.description = description
    valid.customer = customer;
    valid.employee = employee;
    valid.amount = amount;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}