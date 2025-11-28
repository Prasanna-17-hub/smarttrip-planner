import { useLocation, Link } from "react-router-dom";
import ItineraryDayMap from "../components/ItineraryDayMap";
import { useState, useRef } from "react";
import api from "../services/axiosInstance";
import PrintableItinerary from "../components/PrintableItinerary";
import { useReactToPrint } from "react-to-print";

function ItineraryResult() {
  const location = useLocation();
  const state = location.state;

  const [expanded, setExpanded] = useState(null);

  // Safety check
  if (!state || !state.dayWisePlan) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600">No itinerary found.</h2>
        <Link to="/itinerary-form">
          <button className="bg-green-600 text-white p-2 rounded mt-3">
            Go Back
          </button>
        </Link>
      </div>
    );
  }

  const { totalCost, dayWisePlan, totalDays, city, budget } = state;

  // -------------------------------
  // SAVE TRIP TO DATABASE
  // -------------------------------
  const saveTripToDB = async () => {
    try {
      const token = localStorage.getItem("token");
      const cleanPlan = JSON.parse(JSON.stringify(dayWisePlan));

      const payload = {
        city,
        days: totalDays,
        budget,
        totalCost,
        dayWisePlan: cleanPlan,
      };

      console.log("👉 Trip Payload:", payload);

      await api.post("/trips/save", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Trip saved to dashboard!");
    } catch (err) {
      console.error("❌ SaveTrip ERROR:", err);
      alert("Failed to save trip.");
    }
  };

  // -------------------------------
  // PDF DOWNLOAD SETUP (FINAL FIX)
  // -------------------------------
  const printRef = useRef();

  const handleDownloadPdf = useReactToPrint({
    content: () => printRef.current,
    contentRef: printRef,      // ⭐ REQUIRED for react-to-print v3+
    documentTitle: "SmartTrip-Itinerary",
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* -------------------------------
          📌 Hidden Printable PDF Content
      ------------------------------- */}
      <div style={{ display: "none" }}>
        <PrintableItinerary
          ref={printRef}
          itinerary={{
            totalCost,
            dayWisePlan,
            city,
            days: totalDays,
            budget,
          }}
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">Your Travel Itinerary</h1>

      {/* Action Buttons */}
      <div className="mb-4">
        <button
          onClick={saveTripToDB}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Trip
        </button>

        <button
          onClick={handleDownloadPdf}
          className="bg-purple-600 text-white px-4 py-2 rounded ml-3"
        >
          Download PDF
        </button>
      </div>

      <p className="text-xl mb-6">
        Estimated Total Cost:{" "}
        <span className="font-bold text-green-700">${totalCost}</span>
      </p>

      {/* Day-wise itinerary display */}
      {dayWisePlan.map((dayObj) => (
        <div
          key={dayObj.day}
          className="border rounded shadow p-4 mb-6 bg-white"
        >
          {/* Day Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setExpanded(expanded === dayObj.day ? null : dayObj.day)
            }
          >
            <h2 className="text-xl font-bold">Day {dayObj.day}</h2>
            <span className="text-blue-600 font-bold text-xl">
              {expanded === dayObj.day ? "−" : "+"}
            </span>
          </div>

          {/* Expanded Content */}
          {expanded === dayObj.day && (
            <>
              {/* Map */}
              <ItineraryDayMap places={dayObj.places} />

              {/* List of attractions */}
              <div className="mt-3">
                {dayObj.places.map((p, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-100 rounded mb-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-600">
                        Visit: {p.visitDuration} hrs | Travel: {p.travelTime} hrs
                      </p>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${p.latitude},${p.longitude}`}
                      target="_blank"
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Directions
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Plan Another Trip */}
      <Link to="/itinerary-form">
        <button className="bg-green-600 text-white p-3 rounded mt-6">
          Plan Another Trip
        </button>
      </Link>
    </div>
  );
}

export default ItineraryResult;
