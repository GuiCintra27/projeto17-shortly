import { Router } from "express";
import { getRanking, getUser, signIn, signUp } from "../controllers/usersController.js";
import { getRankingValidation, getUserValidation, signInValidation, signUpValidation } from "../middlewares/usersValidation.js";

const usersRoute = Router();

usersRoute.post('/signup', signUpValidation, signUp);
usersRoute.post('/signin', signInValidation, signIn);
usersRoute.get('/users/me', getUserValidation, getUser);
usersRoute.get('/ranking', getRankingValidation, getRanking);

export default usersRoute;