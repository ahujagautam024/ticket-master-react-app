import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Landing from "./Landing.jsx";
import Navigation from "./Navigation.jsx";
import Events from "./Events";
import Attractions from "./Attractions";
import Venues from "./Venues";
import EventDetails from "./EventDetails";
import AttractionDetails from "./AttractionDetails";
import VenueDetails from "./VenueDetails";

function App() {
  return (
    <>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<Navigate to="/events/page/0" />} />
          <Route path="/events/page/:page" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route
            path="/attractions"
            element={<Navigate to="/attractions/page/0" />}
          />
          <Route path="/attractions/page/:page" element={<Attractions />} />
          <Route path="/attractions/:id" element={<AttractionDetails />} />
          <Route path="/venues" element={<Navigate to="/venues/page/0" />} />
          <Route path="/venues/page/:page" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
