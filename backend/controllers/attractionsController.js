import axios from "axios";

export const getAttractions = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.GEOAPIFY_KEY;

  try {
    // Step 1 — Convert city → coordinates
    const geoData = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=${apiKey}`
    );

    if (geoData.data.features.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { lat, lon } = geoData.data.features[0].properties;

    // Step 2 — Fetch attractions
    const places = await axios.get(
      `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=20&apiKey=${apiKey}`
    );

    // Step 3 — Clean data
    const attractions = places.data.features.map((place) => ({
      name: place.properties.name || "Unknown Place",
      address: place.properties.address_line2 || "No address provided",
      categories: place.properties.categories,
      latitude: place.properties.lat,
      longitude: place.properties.lon,
      rating: place.properties.rank || null,
    }));

    res.json({ city, attractions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attractions" });
  }
};
