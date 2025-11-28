import { useEffect, useState } from "react";
import api from "../services/axiosInstance";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  if (loading) return <Spinner />;
  const loadTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/trips/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // SAFETY: normalize itinerary format
      const normalizedTrips = res.data.trips.map(t => ({
        ...t,
        dayWisePlan: Array.isArray(t.itinerary) 
          ? t.itinerary
          : t.itinerary?.dayWisePlan || []
      }));

      setTrips(normalizedTrips);

    } catch (err) {
      console.error(err);
      alert("Error loading trips.");
    }
  };

  const deleteTrip = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrips(prev => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Saved Trips</h1>

      {trips.length === 0 && (
        <p className="text-gray-600">No saved trips yet.</p>
      )}

      {trips?.map((trip) => (
        <div key={trip.id} className="border p-4 mb-4 rounded shadow bg-white">
          <h2 className="text-xl font-semibold">{trip.city}</h2>
          <p>{trip.days} days</p>
          <p>Budget: ${trip.budget}</p>
          <p>Total Cost: ${trip.total_cost || "N/A"}</p>

          <button
            className="bg-red-600 text-white px-3 py-1 mt-3 rounded"
            onClick={() => deleteTrip(trip.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
