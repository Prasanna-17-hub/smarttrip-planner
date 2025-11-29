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
      const attractionsRes = await api.get(`/attractions/${city}`);
      const attractions = attractionsRes.data.attractions;

      if (!attractions || attractions.length === 0) {
        alert("No attractions found");
        return;
      }

      const itineraryRes = await generateItinerary({
        city,
        days,
        budget,
        attractions,
      });

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
    <div className="p-8 max-w-xl mx-auto bg-[var(--dark-bg)] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[var(--gold)]">
        Create Your Itinerary
      </h1>

      <label className="text-[var(--text-light)]">City</label>
      <input
        type="text"
        className="bg-[var(--dark-card)] text-[var(--text-light)] border border-[var(--dark-soft)]
                   p-2 w-full mb-4 rounded focus:border-[var(--gold)] focus:outline-none"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <label className="text-[var(--text-light)]">Days</label>
      <input
        type="number"
        min="1"
        className="bg-[var(--dark-card)] text-[var(--text-light)] border border-[var(--dark-soft)]
                   p-2 w-full mb-4 rounded focus:border-[var(--gold)] focus:outline-none"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
      />

      <label className="text-[var(--text-light)]">Budget ($)</label>
      <input
        type="number"
        min="50"
        className="bg-[var(--dark-card)] text-[var(--text-light)] border border-[var(--dark-soft)]
                   p-2 w-full mb-6 rounded focus:border-[var(--gold)] focus:outline-none"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="p-2 w-full rounded font-semibold 
                   bg-[var(--gold)] text-black
                   hover:bg-[var(--gold-soft)] transition"
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>
    </div>
  );
}

export default ItineraryForm;
