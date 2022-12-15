import { Router } from "express";
import { createShortenUrl, deleteUrl, getUrl, openUrl } from "../controllers/linksController.js";
import { createShortenUrlValidation, deleteUrlValidation, getUrlValidation, openUrlValidation } from "../middlewares/linksValidation.js";

const linksRoute = Router();

linksRoute.post('/urls/shorten', createShortenUrlValidation, createShortenUrl);
linksRoute.get('/urls/:id', getUrlValidation, getUrl);
linksRoute.get('/urls/open/:shortUrl', openUrlValidation, openUrl);
linksRoute.delete('/urls/:id', deleteUrlValidation, deleteUrl);

export default linksRoute;