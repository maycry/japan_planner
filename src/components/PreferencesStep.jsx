import React from "react";

const travelPreferences = [
  "🍣 Japanese Cuisine",
  "🏛️ Museums",
  "♨️ Onsen (Hot Springs)",
  "⛩️ Temples & Shrines",
  "🎭 Traditional Arts",
  "🏙️ Modern Architecture",
  "🛍️ Shopping",
  "🌲 Nature & Hiking",
  "🌃 Nightlife",
  "📸 Photography",
  "🏮 Local Markets",
  "🌸 Cherry Blossoms",
  "🎮 Pop Culture",
  "🏯 Historical Sites",
  "👘 Cultural Experiences",
];

function PreferencesStep({
  selectedPreferences,
  onTogglePreference,
  onContinue,
}) {
  return (
    <div className="preferences-container">
      <div className="preferences-content">
        <h1 className="preferences-title">
          What interests you most about Japan?
        </h1>
        <p className="preferences-subtitle">
          Select all that apply to help us personalize your perfect trip
        </p>

        <div className="preferences-grid">
          {travelPreferences.map((preference) => (
            <button
              key={preference}
              className={`preference-chip ${
                selectedPreferences.includes(preference) ? "selected" : ""
              }`}
              onClick={() => onTogglePreference(preference)}
            >
              {preference}
            </button>
          ))}
        </div>

        <div className="preferences-actions">
          <button
            className="continue-button"
            disabled={selectedPreferences.length === 0}
            onClick={onContinue}
          >
            Continue ({selectedPreferences.length} selected)
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreferencesStep;
