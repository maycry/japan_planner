import React, { useState } from "react";
import OpenAI from "openai";
import { OPENAI_API_KEY, OPENAI_CONFIG } from "../config/openai.js";

function ItineraryStep({
  selectedPreferences,
  selectedCities,
  totalDays,
  totalActivities,
  onBack,
  onGenerateItinerary,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  // Collect all data into a structured JSON
  const itineraryData = {
    preferences: selectedPreferences,
    tripSummary: {
      totalDays: totalDays,
      totalActivities: totalActivities,
      totalCities: selectedCities.length,
    },
    cities: selectedCities.map((city, index) => ({
      order: index + 1,
      id: city.id,
      name: city.name,
      region: city.region,
      days: city.days,
      selectedActivities: city.activities
        ? city.activities
            .filter((activity) => activity.selected)
            .map((activity) => ({
              id: activity.id,
              name: activity.name,
              type: activity.type,
            }))
        : [],
      totalSelectedActivities: city.activities
        ? city.activities.filter((activity) => activity.selected).length
        : 0,
    })),
  };

  const generatePrompt = () => {
    const preferencesText = selectedPreferences.join(", ");
    const citiesText = selectedCities
      .map(
        (city) =>
          `${city.name} (${city.days} days) - ${
            city.activities?.filter((a) => a.selected).length || 0
          } activities selected`
      )
      .join(", ");

    return `Create a detailed day-by-day travel itinerary for Japan based on the following information:

TRAVEL PREFERENCES: ${preferencesText}

CITIES AND DURATION: ${citiesText}

SELECTED ACTIVITIES BY CITY:
${selectedCities
  .map((city) => {
    const activities = city.activities?.filter((a) => a.selected) || [];
    return `${city.name} (${city.days} days):
${activities.map((a) => `- ${a.name} (${a.type})`).join("\n")}`;
  })
  .join("\n\n")}

Please create an itinerary in JSON format with the following structure:
{
  "title": "Itinerary name (3-4 words)",
  "cities": [
    {
      "name": "City Name",
      "days": [
        {
          "day": 1,
          "title": "Day Theme Title",
          "activities": [
            {
              "time": "Morning",
              "name": "Activity Name",
              "description": "Brief description or location details"
            }
          ]
        }
      ]
    }
  ]
}

Requirements:
- Use GLOBAL day numbering across the entire trip (Day 1, 2, 3... up to ${totalDays}) NOT per-city numbering
- Each day must have a "title" field with a short thematic title (5-7 words) that summarizes the day's activities
- Day titles should reflect the main theme/focus of that day
- Use the selected activities for each city
- Distribute activities logically across the allocated days
- Consider travel preferences when organizing activities
- Include practical details like timing and locations
- Make sure each day has a reasonable number of activities (2-4 per day)
- Consider geographical proximity when scheduling activities within a day
- Use time slots: Morning, Afternoon, Evening
- Return ONLY valid JSON, no additional text or formatting`;
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = generatePrompt();

      // Try to use OpenAI API first, fallback to mock if API key not configured
      let response;
      try {
        response = await callOpenAI(prompt);
        // Parse JSON response
        try {
          const parsedItinerary = JSON.parse(response);
          onGenerateItinerary(parsedItinerary);
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          // Fallback to mock if JSON parsing fails
          const mockResponse = await mockLLMCall(prompt);
          onGenerateItinerary(mockResponse);
        }
      } catch (apiError) {
        if (apiError.message.includes("API key not configured")) {
          console.warn("OpenAI API key not configured, using mock response");
          const mockResponse = await mockLLMCall(prompt);
          onGenerateItinerary(mockResponse);
        } else {
          throw apiError;
        }
      }
    } catch (err) {
      setError(
        err.message || "Failed to generate itinerary. Please try again."
      );
      console.error("Error generating itinerary:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Real OpenAI API call
  const callOpenAI = async (prompt) => {
    // Check if API key is configured
    if (!OPENAI_API_KEY) {
      throw new Error(
        "OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables."
      );
    }

    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, // Note: In production, API calls should be made from backend
      });

      const completion = await openai.chat.completions.create({
        model: OPENAI_CONFIG.model,
        messages: [
          {
            role: "system",
            content:
              "You are a professional travel planner specializing in Japan. Create detailed, practical itineraries that consider travel preferences, timing, and geographical proximity. Format your response exactly as requested with clear structure.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: OPENAI_CONFIG.max_tokens,
        temperature: OPENAI_CONFIG.temperature,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      if (error.status === 401) {
        throw new Error(
          "Invalid OpenAI API key. Please check your API key in src/config/openai.js"
        );
      } else if (error.status === 429) {
        throw new Error(
          "OpenAI API rate limit exceeded. Please try again in a moment."
        );
      } else if (error.status === 500) {
        throw new Error(
          "OpenAI service is temporarily unavailable. Please try again later."
        );
      } else {
        throw new Error(
          `OpenAI API error: ${error.message || "Unknown error"}`
        );
      }
    }
  };

  // Fallback mock function (used when API key is not configured)
  const mockLLMCall = async (prompt) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate a realistic sample itinerary based on the data in JSON format
    const citiesData = selectedCities;
    let globalDayCounter = 1;

    // Helper function to generate day titles based on activities
    const generateDayTitle = (activities, isArrivalDay = false) => {
      if (isArrivalDay) return "Arrival Day";
      if (!activities || activities.length === 0) return "Free Exploration";

      const activityNames = activities
        .map((a) => a.name.toLowerCase())
        .join(" ");
      if (activityNames.includes("temple") || activityNames.includes("shrine"))
        return "Sacred Spaces";
      if (
        activityNames.includes("market") ||
        activityNames.includes("food") ||
        activityNames.includes("cooking")
      )
        return "Culinary Discovery";
      if (
        activityNames.includes("castle") ||
        activityNames.includes("historical") ||
        activityNames.includes("museum")
      )
        return "Historical Journey";
      if (
        activityNames.includes("park") ||
        activityNames.includes("nature") ||
        activityNames.includes("bamboo")
      )
        return "Nature Escape";
      if (
        activityNames.includes("shopping") ||
        activityNames.includes("district") ||
        activityNames.includes("harajuku")
      )
        return "Modern Culture";
      if (
        activityNames.includes("island") ||
        activityNames.includes("miyajima")
      )
        return "Island Adventure";
      return "Cultural Experience";
    };

    const mockItinerary = {
      title: "Classic Japan Adventure",
      cities: citiesData.map((city) => {
        const activities = city.activities?.filter((a) => a.selected) || [];
        const activitiesPerDay = Math.max(
          1,
          Math.ceil(activities.length / city.days)
        );

        const days = [];
        for (let day = 1; day <= city.days; day++) {
          const startIndex = (day - 1) * activitiesPerDay;
          const endIndex = Math.min(
            startIndex + activitiesPerDay,
            activities.length
          );
          const dayActivities = activities.slice(startIndex, endIndex);

          const dayData = {
            day: globalDayCounter,
            title: "",
            activities: [],
          };

          if (dayActivities.length === 0) {
            // Add some generic activities for empty days
            if (day === 1) {
              dayData.title = generateDayTitle([], true);
              dayData.activities = [
                {
                  time: "Morning",
                  name: `Arrive in ${city.name}`,
                  description: "Check into accommodation and get oriented",
                },
                {
                  time: "Afternoon",
                  name: "Explore local area",
                  description:
                    "Walk around the neighborhood and find nearby amenities",
                },
              ];
            } else {
              dayData.title = generateDayTitle([]);
              dayData.activities = [
                {
                  time: "Morning",
                  name: "Free time for shopping",
                  description: "Explore local markets and shopping districts",
                },
                {
                  time: "Afternoon",
                  name: "Local cuisine exploration",
                  description:
                    "Try authentic local restaurants and street food",
                },
              ];
            }
          } else {
            dayData.title = generateDayTitle(dayActivities, day === 1);
            dayActivities.forEach((activity, actIndex) => {
              const timeSlots = ["Morning", "Afternoon", "Evening"];
              const timeSlot = timeSlots[actIndex % timeSlots.length];

              dayData.activities.push({
                time: timeSlot,
                name: activity.name,
                description: `Experience this ${activity.type.toLowerCase()} attraction`,
              });
            });
          }

          days.push(dayData);
          globalDayCounter++;
        }

        return {
          name: city.name,
          days: days,
        };
      }),
    };

    return mockItinerary;
  };

  return (
    <div className="itinerary-container">
      <div className="itinerary-content">
        <h1 className="itinerary-title">Your Japan Travel Plan</h1>
        <p className="itinerary-subtitle">
          Here's your customized itinerary based on your preferences
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

        <div className="json-output">
          <h3>Complete Trip Data (JSON)</h3>
          <div className="json-container">
            <pre className="json-display">
              {JSON.stringify(itineraryData, null, 2)}
            </pre>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <br />
            <button className="retry-button" onClick={generateItinerary}>
              Try Again
            </button>
          </div>
        )}

        <div className="itinerary-actions">
          <button className="back-button" onClick={onBack}>
            ← Back to Activities
          </button>
          <button
            className="generate-button"
            onClick={generateItinerary}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="generating-spinner"></span>
                Generating Itinerary...
              </>
            ) : (
              "Generate Itinerary"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItineraryStep;
