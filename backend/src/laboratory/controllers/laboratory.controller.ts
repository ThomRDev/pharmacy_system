import { Request, Response } from "express";
import { UpdateResult } from "typeorm";
import { HttpResponse } from "../../shared/response/http.response";
import { LaboratoryService } from "../services/laboratory.service";

export class LaboratoryController {
  constructor(
    private readonly laboratoryService = new LaboratoryService(),
    private readonly httpResponse = new HttpResponse()
  ){}
  async getLaboratories(req: Request, res: Response) {
    try {
      const data = await this.laboratoryService.findAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  async getLaboratoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.laboratoryService.findByID(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  async createLaboratory(req: Request, res: Response) {
    try {
      const data = await this.laboratoryService.create(req.body);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async updateLaboratory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.laboratoryService.update(
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
}