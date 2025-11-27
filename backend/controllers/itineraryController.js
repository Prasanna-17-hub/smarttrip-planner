export const generateItinerary = (req, res) => {
  const { days, budget, attractions } = req.body;

  if (!days || !budget || !attractions) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const DAILY_LIMIT_HOURS = 8;
  const FIXED_TRAVEL_TIME = 0.3;
  const FIXED_COST = 10;

  // 1. Sort places by rating
  const sorted = attractions.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  let dayPlans = [];
  let currentDay = [];
  let timeUsed = 0;
  let totalCost = 0;
  let dayNumber = 1;

  sorted.forEach(place => {
    const visitDuration = 1.5;
    const travelTime = FIXED_TRAVEL_TIME;

    const totalTime = visitDuration + travelTime;

    if (timeUsed + totalTime > DAILY_LIMIT_HOURS) {
      dayPlans.push({ day: dayNumber, places: currentDay });
      currentDay = [];
      dayNumber++;
      timeUsed = 0;
    }

    if (dayNumber <= days) {
      // ⭐ CLEAN PLACE OBJECT (Important!)
      const cleanedPlace = {
        name: place.name,
        address: place.address || "",
        latitude: place.latitude,
        longitude: place.longitude,
        rating: place.rating || 0,
        visitDuration,
        travelTime
      };

      currentDay.push(cleanedPlace);

      timeUsed += totalTime;
      totalCost += FIXED_COST;
    }
  });

  if (currentDay.length > 0 && dayPlans.length < days) {
    dayPlans.push({ day: dayNumber, places: currentDay });
  }

  res.json({
    totalDays: days,
    totalCost,
    dayWisePlan: dayPlans
  });
};
