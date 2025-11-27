import api from "./axiosInstance";

export const generateItinerary = (data) => 
  api.post("/itinerary/generate", data);
