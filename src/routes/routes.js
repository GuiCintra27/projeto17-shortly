import { Router } from "express";
import linksRoute from "./linksRoute.js";
import usersRoute from "./usersRoute.js";

const router = Router();

router.use(usersRoute);
router.use(linksRoute);

export default router;