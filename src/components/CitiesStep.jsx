import React from "react";
import CityItem from "./CityItem";

function CitiesStep({
  selectedCities,
  otherCities,
  totalDays,
  onDragStart,
  onDragOver,
  onDrop,
  onUpdateDays,
  onRemoveCity,
  onAddCity,
  onContinue,
}) {
  return (
    <div className="cities-container">
      <div className="cities-content">
        <h1 className="cities-title">Which cities would you like to visit?</h1>
        <p className="cities-subtitle">
          Select cities and drag to reorder your itinerary
        </p>

        {selectedCities.length > 0 && (
          <div className="cities-section">
            <h3 className="section-title">Selected Cities</h3>
            <div className="cities-list">
              {selectedCities.map((city, index) => (
                <CityItem
                  key={city.id}
                  city={city}
                  index={index}
                  isSelected={true}
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onUpdateDays={onUpdateDays}
                  onRemove={onRemoveCity}
                />
              ))}
            </div>
          </div>
        )}

        {otherCities.length > 0 && (
          <div className="cities-section">
            <h3 className="section-title">Other Cities</h3>
            <div className="cities-list">
              {otherCities.map((city) => (
                <CityItem
                  key={city.id}
                  city={city}
                  isSelected={false}
                  onAdd={onAddCity}
                />
              ))}
            </div>
          </div>
        )}

        <div className="cities-actions">
          <div className="trip-summary">
            Total trip duration: <strong>{totalDays} days</strong>
          </div>
          <button
            className="continue-button"
            disabled={selectedCities.length === 0}
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CitiesStep;
