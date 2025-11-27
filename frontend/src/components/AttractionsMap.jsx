import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Polyline } from "react-leaflet";
import L from "leaflet";
import { fixLeafletIconPaths } from "../utils/leafletIcons";

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export default function AttractionsMap({
  attractions,
  selectedAttraction,
  onMapReady,
  userLocation,
}) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [routeCoords, setRouteCoords] = useState([]);

  // Fix marker icons
  useEffect(() => {
    fixLeafletIconPaths();
  }, []);

  const tileUrl = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`;

  /*****************************************************
   * FLY TO SELECTED ATTRACTION
   *****************************************************/
  useEffect(() => {
    if (
      !selectedAttraction ||
      !mapRef.current ||
      !markersRef.current[selectedAttraction.name]
    ) {
      return;
    }

    const map = mapRef.current;
    const marker = markersRef.current[selectedAttraction.name];

    map.flyTo([selectedAttraction.latitude, selectedAttraction.longitude], 15, {
      duration: 1.2,
    });

    setTimeout(() => marker.openPopup(), 400);
  }, [selectedAttraction]);

  /*****************************************************
   * ROUTE FROM USER → ATTRACTION USING GEOAPIFY API
   *****************************************************/
  const routeFromUser = async (lat, lon) => {
    if (!userLocation) {
      alert("Turn ON location first.");
      return;
    }

    const url = `https://api.geoapify.com/v1/routing?waypoints=${userLocation.lon},${userLocation.lat}|${lon},${lat}&mode=drive&apiKey=${GEOAPIFY_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data || !data.features || data.features.length === 0) {
        alert("Routing failed");
        return;
      }

      const coordinates = data.features[0].geometry.coordinates[0].map((c) => [
        c[1], // lat
        c[0], // lon
      ]);

      setRouteCoords(coordinates);
    } catch (err) {
      console.error("Routing error:", err);
    }
  };

  return (
    <div className="w-full h-[60vh] rounded shadow overflow-hidden">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4}
        whenCreated={(map) => {
          mapRef.current = map;
          if (onMapReady) onMapReady(map, routeFromUser);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url={tileUrl} />

        {/* User GPS Location */}
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lon]}
            radius={8}
            pathOptions={{ color: "blue", fillColor: "skyblue", fillOpacity: 1 }}
          />
        )}

        {/* Route Line */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} pathOptions={{ color: "blue", weight: 5 }} />
        )}

        {/* Attraction Markers */}
        {attractions.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            ref={(marker) => {
              if (marker) markersRef.current[place.name] = marker;
            }}
          >
            <Popup>
              <h2 className="font-bold text-lg">{place.name}</h2>
              <p className="text-sm">{place.address}</p>
              <button
                onClick={() => routeFromUser(place.latitude, place.longitude)}
                className="bg-blue-600 text-white text-sm px-3 py-1 mt-2 rounded"
              >
                Navigate from My Location
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
