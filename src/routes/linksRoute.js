import { Router } from "express";
import { createShortenUrl, getUrl, openUrl } from "../controllers/linksController.js";
import { createShortenUrlValidation, getUrlValidation, openUrlValidation } from "../middlewares/linksValidation.js";

const linksRoute = Router();

linksRoute.post('/urls/shorten', createShortenUrlValidation, createShortenUrl);
linksRoute.get('/urls/:id', getUrlValidation, getUrl);
linksRoute.get('/urls/open/:shortUrl', openUrlValidation, openUrl);

export default linksRoute;