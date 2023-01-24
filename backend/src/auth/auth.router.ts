import { BaseRouter } from "../shared/router/router"
import { AuthController } from "./controllers/auth.controller"
import { AuthMiddleware } from "./middlewares/auth.middlewares"

export class AuthRouter extends BaseRouter<AuthController,AuthMiddleware>{
  constructor(
    
  ){
    super(AuthController,AuthMiddleware)
  }
  routes(): void {
    this.router.post("/login",
    [ this.middleware.validateRequest.bind(this.middleware) ]
    ,this.controller.login.bind(this.controller))

    this.router.post("/auth/check",[
      this.middleware.validateJWT.bind(this.middleware)
    ],this.controller.checking.bind(this.controller))
  }
}