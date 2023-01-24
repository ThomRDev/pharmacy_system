import { Request, Response } from "express";
import { ResumeService } from "../services/resume.service";
import { HttpResponse } from "../../shared/response/http.response";
import { isObjectEmpty } from "../../utils";

export class ResumeController {
  constructor(
    private readonly resumeService = new ResumeService(),
    private readonly httpResponse = new HttpResponse(),
  ){}

  async getResume(req: Request, res: Response) {
    try {
      const data = await this.resumeService.getResume();
      const d = data.reduce((acc,curr)=>{
        return {...acc,...curr[0]}
      },{})
      const empty = isObjectEmpty(d)
      if(empty){
        return this.httpResponse.Error(res, "Error de coherencia");
      }
      return this.httpResponse.Ok(res, d);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
}