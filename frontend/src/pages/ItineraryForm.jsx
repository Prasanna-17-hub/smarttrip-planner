import { useState } from "react";
import api from "../services/axiosInstance";
import { generateItinerary } from "../services/itineraryService";
import { useNavigate } from "react-router-dom";

function ItineraryForm() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState(200);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!city) return alert("Please enter city");

    setLoading(true);
    try {
      // Step 1 — Get attractions
      const attractionsRes = await api.get(`/attractions/${city}`);
      const attractions = attractionsRes.data.attractions;

      if (!attractions || attractions.length === 0) {
        alert("No attractions found");
        return;
      }

      // Step 2 — Generate itinerary
      const itineraryRes = await generateItinerary({
        city,
        days,
        budget,
        attractions,
      });

      // Step 3 — Pass data to next page
      navigate("/itinerary-result", {
        state: itineraryRes.data,
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Your Itinerary</h1>

      <label>City</label>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <label>Days</label>
      <input
        type="number"
        className="border p-2 w-full mb-4"
        min="1"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      />

      <label>Budget ($)</label>
      <input
        type="number"
        className="border p-2 w-full mb-6"
        min="50"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white p-2 w-full rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>
    </div>
  );
}

export default ItineraryForm;
