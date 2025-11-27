import pool from "../db.js";

// SAVE TRIP
export const saveTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { city, days, budget, totalCost, dayWisePlan } = req.body;

    // Convert itinerary to string for TEXT column
    const itineraryString = JSON.stringify(dayWisePlan);

    const result = await pool.query(
      `INSERT INTO trips (user_id, city, days, budget, total_cost, itinerary)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, city, days, budget, totalCost, itineraryString]
    );

    res.json({ success: true, trip: result.rows[0] });
  } catch (err) {
    console.error("❌ SAVE TRIP ERROR:", err);
    res.status(500).json({ error: "Unable to save trip" });
  }
};



// GET ALL TRIPS FOR USER
export const getTrips = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );

    res.json({
      trips: result.rows.map(t => ({
        ...t,
        dayWisePlan: JSON.parse(t.itinerary)
      }))
    });

  } catch (err) {
    console.error("❌ FETCH TRIPS ERROR:", err);
    res.status(500).json({ error: "Unable to fetch trips" });
  }
};

// DELETE TRIP
export const deleteTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const tripId = req.params.id;

    await pool.query(
      `DELETE FROM trips WHERE id = $1 AND user_id = $2`,
      [tripId, userId]
    );

    res.json({ success: true, message: "Trip deleted" });
  } catch (err) {
    console.error("❌ DELETE TRIP ERROR:", err);
    res.status(500).json({ error: "Unable to delete trip" });
  }
};
