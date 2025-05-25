import React from "react";

// Helper function to get activity photos (same as in GeneratedItineraryStep)
const getActivityPhotoByType = (name, type) => {
  // Map activity names to specific Unsplash photos
  const photoMappings = {
    // Tokyo
    "Senso-ji Temple":
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=200&fit=crop",
    "Tokyo Skytree":
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    "Tsukiji Outer Market":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Meiji Shrine":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Shibuya Crossing":
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    "Tokyo National Museum":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    "Harajuku District":
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",

    // Kyoto
    "Fushimi Inari Shrine":
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    "Bamboo Grove":
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop",
    "Kinkaku-ji Temple":
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=300&h=200&fit=crop",
    "Gion District":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    "Nishiki Market":
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop",
    "Kyoto Imperial Palace":
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
    "Tea Ceremony":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",

    // Osaka
    "Osaka Castle":
      "https://images.unsplash.com/photo-1589952283406-b53a7a1be2eb?w=300&h=200&fit=crop",
    "Dotonbori District":
      "https://images.unsplash.com/photo-1533650733447-54c7ae69ee66?w=300&h=200&fit=crop",
    "Kuromon Market":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Takoyaki Cooking":
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    "Sumiyoshi Taisha":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Osaka Aquarium":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",

    // Add more cities...
  };

  // If specific photo exists, use it
  if (photoMappings[name]) {
    return photoMappings[name];
  }

  // Fall back to type-based photos
  const typePhotos = {
    "Temple & Shrine":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Modern Architecture":
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
    "Local Markets":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    Photography:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300&h=200&fit=crop",
    Museums:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    "Pop Culture":
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
    Shopping:
      "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=300&h=200&fit=crop",
    Nightlife:
      "https://images.unsplash.com/photo-1533650733447-54c7ae69ee66?w=300&h=200&fit=crop",
    "Japanese Cuisine":
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    "Traditional Arts":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    "Nature & Hiking":
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=300&h=200&fit=crop",
    "Historical Sites":
      "https://images.unsplash.com/photo-1589952283406-b53a7a1be2eb?w=300&h=200&fit=crop",
    "Onsen (Hot Springs)":
      "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=300&h=200&fit=crop",
    Experience:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop",
  };

  return (
    typePhotos[type] ||
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop"
  );
};

function ActivitiesStep({
  selectedCities,
  expandedCityId,
  totalDays,
  totalActivities,
  onToggleCity,
  onDragStart,
  onDragOver,
  onDrop,
  onUpdateDays,
  onRemoveCity,
  onToggleActivity,
  onContinue,
}) {
  return (
    <div className="activities-container">
      <div className="activities-content">
        <h1 className="activities-title">Choose your activities</h1>
        <p className="activities-subtitle">
          Select activities for each city and adjust your itinerary
        </p>

        <div className="cities-section">
          <div className="cities-list">
            {selectedCities.map((city, index) => (
              <div
                key={city.id}
                className={`city-item activities-city ${
                  expandedCityId === city.id ? "expanded" : ""
                }`}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
              >
                <div
                  className="city-header"
                  onClick={() => onToggleCity(city.id)}
                >
                  <div className="drag-handle">
                    <div className="dots">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="city-info">
                    <div className="city-name">{city.name}</div>
                    <div className="city-region">{city.region}</div>
                  </div>
                  <div className="city-controls">
                    <div className="days-selector">
                      <button
                        className="days-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateDays(city.id, city.days - 1);
                        }}
                        disabled={city.days <= 1}
                      >
                        −
                      </button>
                      <span className="days-count">{city.days} days</span>
                      <button
                        className="days-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateDays(city.id, city.days + 1);
                        }}
                        disabled={city.days >= 20}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCity(city.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div className="expand-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`chevron ${
                        expandedCityId === city.id ? "expanded" : ""
                      }`}
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Activity Preview Row - shown only when collapsed */}
                {
                  <div className="activity-preview-row">
                    {city.activities
                      .filter((activity) => activity.selected)
                      .slice(0, 8) // Show max 8 previews
                      .map((activity, index) => (
                        <div
                          key={activity.id}
                          className="activity-preview-card"
                          style={{ zIndex: 10 - index }}
                        >
                          <div className="activity-preview-photo">
                            <img
                              src={getActivityPhotoByType(
                                activity.name,
                                activity.type
                              )}
                              alt={activity.name}
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop";
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    {city.activities.filter((activity) => activity.selected)
                      .length > 8 && (
                      <div className="activity-preview-more">
                        +
                        {city.activities.filter((activity) => activity.selected)
                          .length - 8}
                      </div>
                    )}
                  </div>
                }

                {expandedCityId === city.id && (
                  <div className="activities-list">
                    <div className="activities-grid">
                      {city.activities.map((activity) => (
                        <div key={activity.id} className="activity-card">
                          <div className="activity-photo">
                            <img
                              src={getActivityPhotoByType(
                                activity.name,
                                activity.type
                              )}
                              alt={activity.name}
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop";
                              }}
                            />
                          </div>
                          <div className="activity-content">
                            <div className="activity-content-rows">
                              <div className="activity-name">
                                {activity.name}
                              </div>
                              <div className="activity-type">
                                {activity.type}
                              </div>
                            </div>

                            <button
                              className={`activity-toggle ${
                                activity.selected ? "selected" : ""
                              }`}
                              onClick={() =>
                                onToggleActivity(city.id, activity.id)
                              }
                            >
                              {activity.selected ? "×" : "+"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="activities-actions">
          <div className="trip-summary">
            <span>
              Total trip: <strong>{totalDays} days</strong>
            </span>
            <span>
              Activities: <strong>{totalActivities} selected</strong>
            </span>
          </div>
          <button
            className="continue-button"
            disabled={totalActivities === 0}
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesStep;
