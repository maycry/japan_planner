import React from "react";

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
                            {/* Placeholder for photo */}
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
                            {/* Placeholder for photo */}
                          </div>
                          <div className="activity-content">
                            <div className="activity-name">{activity.name}</div>
                            <div className="activity-type">{activity.type}</div>
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
