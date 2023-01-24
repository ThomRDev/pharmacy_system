import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { BaseRouter } from "../shared/router/router";
import { ResumeController } from "./controllers/resume.controller";

export class ResumeRouter extends BaseRouter<ResumeController,SharedMiddleware>{
  constructor(){
    super(ResumeController,SharedMiddleware)
  }
  routes(): void {
      this.router.get("/resume",[this.middleware.validateJWT.bind(this.middleware)],this.controller.getResume.bind(this.controller))
  }
}