import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import attractionsRoutes from "./routes/attractions.js";
import itineraryRoutes from "./routes/itinerary.js";
import tripRoutes from "./routes/trips.js";
dotenv.config();

import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/attractions", attractionsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("SmartTrip Backend Running - Day 2!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
