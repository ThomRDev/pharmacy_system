import { LaboratoryMiddleware } from './middlewares/laboratory.middleware';
import { LaboratoryController } from './controllers/laboratory.controller';
import { BaseRouter } from "../shared/router/router";

export class LaboratoryRouter extends BaseRouter<LaboratoryController,LaboratoryMiddleware>{
  constructor(){
    super(LaboratoryController,LaboratoryMiddleware)
  }
  routes(): void {
    this.router.get("/laboratories",
      [this.middleware.validateJWT.bind(this.middleware)],
      this.controller.getLaboratories.bind(this.controller)
    );


    this.router.get("/laboratories/laboratory/:id",
      [this.middleware.validateJWT.bind(this.middleware)],
      this.controller.getLaboratoryById.bind(this.controller)
    );
    

    this.router.post("/laboratories/create",
      [
        this.middleware.validateJWT.bind(this.middleware),
        this.middleware.isAdminRole.bind(this.middleware),
        this.middleware.laboraryValidator.bind(this.middleware)
      ],
      this.controller.createLaboratory.bind(this.controller)
    );

    this.router.put("/laboratories/update/:id",
      [
        this.middleware.validateJWT.bind(this.middleware),
        this.middleware.isAdminRole.bind(this.middleware)
      ],
      this.controller.updateLaboratory.bind(this.controller)
    );
  }
}