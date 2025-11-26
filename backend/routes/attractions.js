import express from "express";
import { getAttractions } from "../controllers/attractionsController.js";

const router = express.Router();

router.get("/:city", getAttractions);

export default router;
