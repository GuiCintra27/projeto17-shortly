import { Router } from "express";
import { getUser, signIn, signUp } from "../controllers/usersController.js";
import { getUserValidation, signInValidation, signUpValidation } from "../middlewares/usersValidation.js";

const usersRoute = Router();

usersRoute.post('/signup', signUpValidation, signUp);
usersRoute.post('/signin', signInValidation, signIn);
usersRoute.get('/users/me', getUserValidation, getUser);

export default usersRoute;