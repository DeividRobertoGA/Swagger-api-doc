import { Router } from 'express';
import Controller from "../Controllers/product.controller.js";
import Validator from "../Validator/product.validate.js";
import { verifyJWT } from "../Config/token.config.js";

const route = Router();

route.post("/product/create", [verifyJWT, Validator.createProduct], Controller.createProduct);

route.get("/product/:id", verifyJWT, Controller.readProduct);

route.put("/product/:id", [verifyJWT, Validator.updateProduct], Controller.updateProduct);

route.delete("/product/:id", verifyJWT, Controller.deleteProduct);

route.get("/product/", verifyJWT, Controller.listProducts)

export default route;