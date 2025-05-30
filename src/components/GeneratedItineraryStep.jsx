import React, { useState, useEffect, useRef, useCallback } from "react";
import ItineraryMap from "./ItineraryMap";

// Helper function to get hotel photos based on category and city
const getHotelPhoto = (hotelName, category, cityName) => {
  // Hotel-specific photos
  const hotelPhotos = {
    "Shibuya Sky Hotel":
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&auto=format&q=80",
    "Tokyo Bay Marriott":
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop&auto=format&q=80",
    "Capsule Inn Akihabara":
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop&auto=format&q=80",
    "Park Hyatt Tokyo":
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=300&h=200&fit=crop&auto=format&q=80",
    "Ryokan Asakusa":
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop&auto=format&q=80",
    "Gion Nanba":
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300&h=200&fit=crop&auto=format&q=80",
    "The Ritz-Carlton Kyoto":
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=300&h=200&fit=crop&auto=format&q=80",
  };

  if (hotelPhotos[hotelName]) {
    return hotelPhotos[hotelName];
  }

  // Category-based photos
  const categoryPhotos = {
    Budget:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=300&h=200&fit=crop&auto=format&q=80",
    "Mid-range":
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop&auto=format&q=80",
    Luxury:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=300&h=200&fit=crop&auto=format&q=80",
  };

  return (
    categoryPhotos[category] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&auto=format&q=80"
  );
};

// Helper function to get activity photos
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

    // Hiroshima
    "Peace Memorial Park":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Atomic Bomb Dome":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Miyajima Island":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Itsukushima Shrine":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Peace Memorial Museum":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    "Okonomiyaki Cooking":
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",

    // Nara
    "Todai-ji Temple":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Nara Park":
      "https://images.unsplash.com/photo-1566400799264-631e3be96e11?w=300&h=200&fit=crop",
    "Deer Feeding":
      "https://images.unsplash.com/photo-1566400799264-631e3be96e11?w=300&h=200&fit=crop",
    "Kasuga Taisha":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Nara National Museum":
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    "Kofuku-ji Temple":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
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

function GeneratedItineraryStep({
  selectedPreferences,
  selectedCities,
  totalDays,
  totalActivities,
  generatedItinerary,
  onBack,
  onRegenerate,
}) {
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cityRefs = useRef([]);

  // Function to scroll to a specific city
  const scrollToCity = useCallback((cityIndex) => {
    if (cityRefs.current[cityIndex] && scrollContainerRef.current) {
      cityRefs.current[cityIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, []);

  // Scroll detection to track active city
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      const scrollCenter = scrollTop + containerHeight / 2;

      // Find which city section is most visible
      let activeIndex = 0;
      let minDistance = Infinity;

      cityRefs.current.forEach((cityRef, index) => {
        if (cityRef) {
          // Get position relative to the scroll container
          const cityTop = cityRef.offsetTop - scrollContainer.offsetTop;
          const cityHeight = cityRef.offsetHeight;
          const cityCenter = cityTop + cityHeight / 2;
          const distance = Math.abs(scrollCenter - cityCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        }
      });

      setActiveCityIndex(activeIndex);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [generatedItinerary]);

  // Get activity photo with proper type information
  const getActivityPhotoWithType = (activityName, cityName) => {
    const city = selectedCities.find((c) => c.name === cityName);
    if (city && city.activities) {
      const activity = city.activities.find((a) => a.name === activityName);
      if (activity && activity.photo) {
        return activity.photo;
      }
      if (activity) {
        return getActivityPhotoByType(activityName, activity.type);
      }
    }
    // Default fallback
    return getActivityPhotoByType(activityName, "Experience");
  };

  // Get activity photo from selected cities data or use photo helper
  const getActivityPhoto = (activityName, cityName = null) => {
    if (cityName) {
      return getActivityPhotoWithType(activityName, cityName);
    }

    for (const city of selectedCities) {
      if (city.activities) {
        const activity = city.activities.find((a) => a.name === activityName);
        if (activity && activity.photo) {
          return activity.photo;
        }
        if (activity) {
          return getActivityPhotoByType(activityName, activity.type);
        }
      }
    }
    // Use photo helper function if no photo found in data
    return getActivityPhotoByType(activityName, "Experience");
  };

  // Get activity type from selected cities data
  const getActivityType = (activityName, cityName) => {
    const city = selectedCities.find((c) => c.name === cityName);
    if (city && city.activities) {
      const activity = city.activities.find((a) => a.name === activityName);
      if (activity) return activity.type;
    }
    return "Experience";
  };

  // Format the itinerary text with proper HTML structure
  const formatItinerary = (data) => {
    if (!data) return null;

    return (
      <div className="timeline-itinerary">
        {/* Main itinerary title */}
        <div className="main-itinerary-title">
          {data.title || "Your Japan Adventure"}
        </div>

        {data.cities &&
          data.cities.map((city, cityIndex) => (
            <div
              key={cityIndex}
              className="timeline-city-section"
              ref={(el) => (cityRefs.current[cityIndex] = el)}
              data-city-index={cityIndex}
            >
              {/* City title */}
              <div className="timeline-city-title">{city.name}</div>

              {/* Days container */}
              <div className="timeline-days-container">
                {city.days &&
                  city.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="timeline-day-section">
                      <div className="timeline-day-title">
                        <span className="day-number">Day {day.day}</span>
                        {day.title && (
                          <span className="day-theme">{day.title}</span>
                        )}
                      </div>

                      {/* Activities timeline */}
                      <div className="timeline-activities">
                        {day.activities &&
                          day.activities.map((activity, actIndex) => (
                            <div
                              key={actIndex}
                              className="timeline-activity-card"
                            >
                              {/* Timeline dot and line */}
                              <div className="timeline-marker">
                                <div className="timeline-dot"></div>
                                {actIndex < day.activities.length - 1 && (
                                  <div className="timeline-line"></div>
                                )}
                              </div>

                              {/* Activity content */}
                              <div className="activity-card-content">
                                <div className="activity-photo">
                                  <img
                                    src={getActivityPhoto(
                                      activity.name,
                                      city.name
                                    )}
                                    alt={activity.name}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop";
                                    }}
                                  />
                                </div>
                                <div className="activity-info">
                                  <div className="activity-header">
                                    <span className="activity-type">
                                      {getActivityType(
                                        activity.name,
                                        city.name
                                      )}
                                    </span>
                                  </div>
                                  <div className="activity-name">
                                    {activity.name}
                                  </div>
                                  {activity.description && (
                                    <div className="activity-description">
                                      {activity.description}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Hotels section for this city */}
              {city.hotels && city.hotels.length > 0 && (
                <div className="hotels-section">
                  <div className="hotels-title">
                    <h3>Recommended Hotels in {city.name}</h3>
                    <p>Choose from budget-friendly to luxury accommodations</p>
                  </div>
                  <div className="hotels-scroll-container">
                    <div className="hotels-grid">
                      {city.hotels.map((hotel, hotelIndex) => (
                        <div key={hotelIndex} className="hotel-card">
                          <div className="hotel-photo">
                            <img
                              src={getHotelPhoto(
                                hotel.name,
                                hotel.category,
                                city.name
                              )}
                              alt={hotel.name}
                              onError={(e) => {
                                e.target.src =
                                  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&auto=format&q=80";
                              }}
                            />
                            <div
                              className={`hotel-category-tag ${hotel.category
                                .toLowerCase()
                                .replace(/[^a-z]/g, "")}`}
                            >
                              {hotel.category}
                            </div>
                          </div>
                          <div className="hotel-info">
                            <div className="hotel-name">{hotel.name}</div>
                            <div className="hotel-price">
                              {hotel.priceRange}
                            </div>
                            <div className="hotel-description">
                              {hotel.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="itinerary-container split-screen">
      {/* Left side - Itinerary content */}
      <div className="itinerary-content-left">
        <h1 className="itinerary-title">Your Personalized Japan Itinerary</h1>
        <p className="itinerary-subtitle">
          AI-generated travel plan based on your preferences
        </p>

        <div className="itinerary-summary">
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-number">{totalDays}</div>
              <div className="summary-label">Days</div>
            </div>
            <div className="summary-card">
              <div className="summary-number">{selectedCities.length}</div>
              <div className="summary-label">Cities</div>
            </div>
            <div className="summary-card">
              <div className="summary-number">{totalActivities}</div>
              <div className="summary-label">Activities</div>
            </div>
            <div className="summary-card">
              <div className="summary-number">{selectedPreferences.length}</div>
              <div className="summary-label">Preferences</div>
            </div>
          </div>
        </div>

        <div className="generated-itinerary">
          <div className="generated-itinerary-header">
            <h2 className="generated-itinerary-title">
              Your Complete Travel Plan
            </h2>
          </div>
          <div className="generated-itinerary-content" ref={scrollContainerRef}>
            <div className="itinerary-text">
              {formatItinerary(generatedItinerary)}
            </div>
          </div>
        </div>

        <div className="itinerary-actions">
          <button className="back-button" onClick={onBack}>
            ← Back to Planning
          </button>
          <button className="generate-button" onClick={onRegenerate}>
            Regenerate Itinerary
          </button>
        </div>
      </div>

      {/* Right side - Map */}
      <div className="itinerary-map-container">
        <div className="map-wrapper">
          <ItineraryMap
            selectedCities={selectedCities}
            generatedItinerary={generatedItinerary}
            activeCityIndex={activeCityIndex}
            onCityClick={scrollToCity}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneratedItineraryStep;
