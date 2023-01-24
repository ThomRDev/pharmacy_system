import {Router} from "express"
// T controller
// U middleware
export class BaseRouter<T,U>{
  router:Router
  controller:T
  middleware:U
  constructor(
    // una instancia de tipo T
    TController:{ new():T},
    UMiddleware:{ new():U},
  ){
    this.router = Router()
    this.controller = new TController()
    this.middleware = new UMiddleware()
    this.routes()
  }
  // si convierto esta funcion a =>
  // entonces ya no funciona esto
  routes(){}
}