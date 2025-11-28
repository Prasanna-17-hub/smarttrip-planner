import { useState, useEffect } from "react";
import api from "../services/axiosInstance";
import AttractionsMap from "../components/AttractionsMap";

function CitySearch() {
  const [city, setCity] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapMethods, setMapMethods] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  /******************************
   * LIVE USER GPS WHEN ENABLED
   ******************************/
  useEffect(() => {
    if (!locationEnabled) {
      setUserLocation(null);
      return;
    }
    if (loading) return <Spinner />;

    if ("geolocation" in navigator) {
      const watcher = navigator.geolocation.watchPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
        },
        (err) => {
          console.error("GPS Error:", err);
        },
        {
          enableHighAccuracy: true,
        }
      );

      return () => navigator.geolocation.clearWatch(watcher);
    }
  }, [locationEnabled]);

  /******************************
   * SEARCH CITY
   ******************************/
  const searchCity = async () => {
    if (!city) return alert("Enter city name");

    const res = await api.get(`/attractions/${city}`);
    setAttractions(res.data.attractions);
    setSelectedAttraction(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Attractions</h1>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Enter city name..."
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded shadow"
 onClick={searchCity}>
          Search
        </button>
      </div>

      {/* LOCATION TOGGLE */}
      <button
        onClick={() => setLocationEnabled(!locationEnabled)}
        className={`px-4 py-2 rounded mb-4 ${
          locationEnabled ? "bg-red-600" : "bg-green-600"
        } text-white`}
      >
        {locationEnabled ? "Turn OFF Location" : "Turn ON Location"}
      </button>

      {/* MAP */}
      <AttractionsMap
        attractions={attractions}
        selectedAttraction={selectedAttraction}
        userLocation={userLocation}
        onMapReady={(map, routeFromUser) =>
          setMapMethods({ map, routeFromUser })
        }
      />

      {/* Attraction list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {attractions.map((place, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedAttraction(place);
              mapMethods?.routeFromUser(place.latitude, place.longitude);
            }}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            <h3 className="font-semibold text-lg">{place.name}</h3>
            <p className="text-sm text-gray-600">{place.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitySearch;
