import { PurchaseController } from './controllers/purchase.controller';
import { BaseRouter } from "../shared/router/router";
import { PurchaseMiddleware } from './middlewares/purchase.middleware';

export class PurchaseRouter extends BaseRouter<PurchaseController,PurchaseMiddleware>{
  constructor(){
    super(PurchaseController,PurchaseMiddleware)
  }
  routes(): void {
    this.router.post("/purchase/generate",[this.middleware.validateJWT.bind(this.middleware)],this.controller.generatePurchase.bind(this.controller))
  }
}