import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCityCoordinates } from "../data/cityCoordinates";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon for cities
const cityIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function ItineraryMap({ selectedCities, generatedItinerary }) {
  const mapRef = useRef();

  // Get coordinates for each city in the order they appear in the itinerary
  const getCityRouteCoordinates = () => {
    // If we have a generated itinerary, use that order
    if (generatedItinerary && generatedItinerary.cities) {
      return generatedItinerary.cities.map((city) => {
        const coords = getCityCoordinates(city.name);
        return {
          name: city.name,
          coordinates: [coords.lat, coords.lng],
          days: city.days ? city.days.length : 0,
        };
      });
    }

    // Fallback to selected cities if no itinerary yet
    if (selectedCities && selectedCities.length > 0) {
      return selectedCities.map((city) => {
        const coords = getCityCoordinates(city.name);
        return {
          name: city.name,
          coordinates: [coords.lat, coords.lng],
          days: city.days || 1,
        };
      });
    }

    return [];
  };

  const routeCoordinates = getCityRouteCoordinates();
  const routePolyline = routeCoordinates.map((city) => city.coordinates);

  // Calculate map bounds to fit all cities
  const calculateBounds = () => {
    if (routeCoordinates.length === 0) return null;

    const lats = routeCoordinates.map((city) => city.coordinates[0]);
    const lngs = routeCoordinates.map((city) => city.coordinates[1]);

    return [
      [Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5],
      [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5],
    ];
  };

  const bounds = calculateBounds();

  // Center map on Japan if no cities selected
  const defaultCenter = [36.2048, 138.2529]; // Center of Japan
  const defaultZoom = 6;

  useEffect(() => {
    if (mapRef.current && bounds) {
      // Fit map to show all cities
      mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [bounds]);

  return (
    <MapContainer
      ref={mapRef}
      center={bounds ? undefined : defaultCenter}
      zoom={bounds ? undefined : defaultZoom}
      bounds={bounds}
      style={{ height: "100%", width: "100%" }}
      className="itinerary-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      
      {/* Alternative English tile layers (uncomment to use):
      
      // Option 1: CartoDB Light (minimal style with English labels)
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      
      // Option 2: Esri World Street Map (guaranteed English labels)
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        maxZoom={20}
      />
      
      */}

      {/* City markers */}
      {routeCoordinates.map((city, index) => (
        <Marker key={city.name} position={city.coordinates} icon={cityIcon}>
          <Popup>
            <div className="map-popup">
              <h3>{city.name}</h3>
              <p>Stop #{index + 1}</p>
              <p>
                {city.days} day{city.days !== 1 ? "s" : ""}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Route line connecting cities */}
      {routePolyline.length > 1 && (
        <Polyline
          positions={routePolyline}
          color="#3b82f6"
          weight={3}
          opacity={0.8}
          dashArray="5, 10"
        />
      )}
    </MapContainer>
  );
}

export default ItineraryMap;
