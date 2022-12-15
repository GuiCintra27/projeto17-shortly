import { Router } from "express";
import { signIn, signUp } from "../controllers/usersController.js";
import { signInValidation, signUpValidation } from "../middlewares/usersValidation.js";

const usersRoute = Router();

usersRoute.post('/signup', signUpValidation, signUp);
usersRoute.post('/signin', signInValidation, signIn);

export default usersRoute;