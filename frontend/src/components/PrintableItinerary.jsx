import React, { forwardRef } from "react";

const PrintableItinerary = forwardRef(({ itinerary }, ref) => {
  if (!itinerary) return null;

  return (
    <div ref={ref} className="p-6">
      <h1 className="text-3xl font-bold mb-4">SmartTrip Itinerary</h1>

      <p className="mb-2"><strong>City:</strong> {itinerary.city}</p>
      <p className="mb-2"><strong>Days:</strong> {itinerary.days}</p>
      <p className="mb-2"><strong>Budget:</strong> ${itinerary.budget}</p>
      <p className="mb-4"><strong>Total Cost:</strong> ${itinerary.totalCost}</p>

      {itinerary.dayWisePlan.map((day, idx) => (
        <div key={idx} className="border p-4 mt-4">
          <h2 className="text-xl font-bold mb-2">Day {day.day}</h2>
          {day.places.map((p, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm">
                Visit: {p.visitDuration} hrs | Travel: {p.travelTime} hrs
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
});

export default PrintableItinerary;
