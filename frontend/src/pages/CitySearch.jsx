import { useState } from "react";
import api from "../services/axiosInstance";

function CitySearch() {
  const [city, setCity] = useState("");
  const [attractions, setAttractions] = useState([]);

  const searchCity = async () => {
    try {
      const res = await api.get(`/attractions/${city}`);
      setAttractions(res.data.attractions);
    } catch (err) {
      alert("City not found or API error");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Search Tourist Attractions</h1>

      <div className="mt-4">
        <input
          type="text"
          className="border p-2 w-64"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white p-2 ml-2 rounded"
          onClick={searchCity}
        >
          Search
        </button>
      </div>

      <div className="mt-6">
        {attractions.map((place, index) => (
          <div key={index} className="p-4 border rounded mb-3">
            <h2 className="font-semibold">{place.name}</h2>
            <p>{place.address}</p>
            <p className="text-sm text-gray-500">
              {place.categories?.[0] || ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitySearch;
