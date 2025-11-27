import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { saveTrip, getTrips, deleteTrip } from "../controllers/tripsController.js";

const router = express.Router();

router.post("/save", authMiddleware, saveTrip);
router.get("/all", authMiddleware, getTrips);
router.delete("/:id", authMiddleware, deleteTrip);

export default router;
