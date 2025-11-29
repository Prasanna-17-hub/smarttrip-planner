import { useEffect, useState } from "react";
import api from "../services/axiosInstance";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadTrips = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/trips/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const normalizedTrips = res.data.trips.map((t) => ({
        ...t,
        dayWisePlan: Array.isArray(t.itinerary)
          ? t.itinerary
          : t.itinerary?.dayWisePlan || [],
      }));

      setTrips(normalizedTrips);
    } catch (err) {
      console.error(err);
      alert("Error loading trips.");
    }
    setLoading(false);
  };

  const deleteTrip = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--dark-bg)] text-[var(--text-light)]">

      {/* ⭐ NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-[var(--dark-card)] border-b border-[var(--dark-soft)] shadow-lg">
        <h1 className="text-2xl font-extrabold text-[var(--gold)] tracking-wide cursor-pointer"
            onClick={() => navigate("/")}>
          ✨ LUXTRIP
        </h1>

        <div className="flex gap-6">
          <Link
            to="/dashboard"
            className="text-[var(--text-light)] hover:text-[var(--gold)] transition"
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="text-[var(--text-light)] hover:text-[var(--gold)] transition"
          >
            Home
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="px-3 py-1 rounded border border-[var(--gold)]
                       text-[var(--gold)] hover:bg-[var(--dark-soft)] transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="p-8 max-w-4xl mx-auto">

        <motion.h1
          className="text-3xl font-bold mb-8 text-[var(--gold)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Saved Trips
        </motion.h1>

        {!loading && trips.length === 0 && (
          <p className="text-[var(--text-muted)]">No saved trips yet.</p>
        )}

        {loading && (
          <p className="text-[var(--text-muted)]">Loading...</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trips?.map((trip, i) => (
            <motion.div
              key={trip.id}
              className="p-5 rounded-xl border border-[var(--dark-soft)]
                         bg-[var(--dark-card)] shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 20px rgba(212,175,55,0.2)",
              }}
            >
              <h2 className="text-xl font-semibold text-[var(--gold)]">
                {trip.city}
              </h2>

              <p className="text-[var(--text-light)]">{trip.days} days</p>
              <p className="text-[var(--text-muted)]">Budget: ${trip.budget}</p>
              <p className="text-[var(--text-muted)]">
                Total Cost: ${trip.total_cost || "N/A"}
              </p>

              <button
                className="mt-4 px-3 py-1 rounded font-semibold
                           bg-red-600 text-white hover:bg-red-700 transition"
                onClick={() => deleteTrip(trip.id)}
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
