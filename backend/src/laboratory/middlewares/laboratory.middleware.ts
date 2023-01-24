import { LaboratoryDTO } from './../dtos/laboratory.dto';
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { validate } from 'class-validator';

export class LaboratoryMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  laboraryValidator(req: Request, res: Response, next: NextFunction) {
    const { address, description, name,lat,lng } = req.body;
    const valid = new LaboratoryDTO();
    valid.name = name;
    valid.address = address;
    valid.description = description;
    valid.lat = lat
    valid.lng = lng

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}