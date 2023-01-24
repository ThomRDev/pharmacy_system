import { BaseRouter } from "../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProductMiddleware } from "./middlewares/product.middleware";

export class ProductRouter extends BaseRouter<ProductController,ProductMiddleware>{
  constructor(){
    super(ProductController,ProductMiddleware)
  }

  routes(): void {
    this.router.get("/products",
      [this.middleware.validateJWT.bind(this.middleware)],
    this.controller.getProducts.bind(this.controller));
    
    this.router.get("/products/product/:id",
      [this.middleware.validateJWT.bind(this.middleware)],
    this.controller.getProductById.bind(this.controller));
    
    this.router.get("/products/most-selled",
      [this.middleware.validateJWT.bind(this.middleware)],
    this.controller.getMostSelledProducts.bind(this.controller));
    
    this.router.get("/products/search",
      [this.middleware.validateJWT.bind(this.middleware)],
    this.controller.findProductsByName.bind(this.controller));
    
    this.router.post("/products/create",
      [
        this.middleware.validateJWT.bind(this.middleware),
        this.middleware.isAdminRole.bind(this.middleware),
        this.middleware.productValidator.bind(this.middleware)
      ],
    this.controller.createProduct.bind(this.controller));
    
    this.router.put("/products/update/:id",
      [this.middleware.validateJWT.bind(this.middleware),this.middleware.isAdminRole.bind(this.middleware)],
    this.controller.updateProduct.bind(this.controller));
    
    this.router.delete("/products/delete/:id",
      [this.middleware.validateJWT.bind(this.middleware),this.middleware.isAdminRole.bind(this.middleware)],
    this.controller.deleteProduct.bind(this.controller));
  }
}