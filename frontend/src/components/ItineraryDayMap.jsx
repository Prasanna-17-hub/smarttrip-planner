import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { fixLeafletIconPaths } from "../utils/leafletIcons";

const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

export default function ItineraryDayMap({ places }) {
  const mapRef = useRef(null);

  useEffect(() => {
    fixLeafletIconPaths();
  }, []);

  useEffect(() => {
    // 🚨 STOP if map not ready yet
    if (!mapRef.current) return;

    // 🚨 STOP if places empty
    if (!places || places.length === 0) return;

    const map = mapRef.current;

    const bounds = places
      .filter((p) => p.latitude && p.longitude)
      .map((p) => [p.latitude, p.longitude]);

    if (bounds.length > 0) {
      // Add small delay to let map fully initialize
      setTimeout(() => {
        try {
          map.fitBounds(bounds, { padding: [50, 50] });
        } catch (e) {
          console.warn("fitBounds failed:", e);
        }
      }, 200);
    }
  }, [places]);

  const tileUrl = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_KEY}`;

  return (
    <div className="w-full h-[40vh] rounded overflow-hidden shadow mb-4">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
        }}
      >
        <TileLayer url={tileUrl} />

        {places.map((p, i) =>
          p.latitude && p.longitude ? (
            <Marker key={i} position={[p.latitude, p.longitude]}>
              <Popup>
                <h3 className="font-semibold">{p.name}</h3>
                <a
                  className="text-blue-600 underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${p.latitude},${p.longitude}`}
                  target="_blank"
                >
                  Open in Google Maps
                </a>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
