import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CitySearch from "./pages/CitySearch";
import ItineraryForm from "./pages/ItineraryForm";
import ItineraryResult from "./pages/ItineraryResult";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/city-search" element={<CitySearch />} />
        <Route path="/itinerary-form" element={<ItineraryForm />} />
        <Route path="/itinerary-result" element={<ItineraryResult />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
