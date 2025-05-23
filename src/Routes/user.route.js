import { Router } from 'express';
import Controller from "../Controllers/user.controller.js";
import Validator from "../Validator/user.validate.js"

const route = Router();

route.post("/login", Validator.login, Controller.login);

route.post("/register", Validator.register, Controller.register);

route.post("/recoverPassword", Validator.recoverPassword, Controller.recoverPassword);

export default route;