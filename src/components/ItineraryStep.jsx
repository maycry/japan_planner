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
          "title": "Day Theme Title Summarizing day activities",
          "activities": [
            {
              "time": "Morning",
              "name": "Activity Name",
              "description": "Brief description or location details"
            }
          ]
        }
      ],
      "hotels": [
        {
          "name": "Hotel Name",
          "priceRange": "$50-100/night",
          "category": "Budget",
          "description": "Brief hotel description"
        }
      ]
    }
  ]
}

Requirements:
- Use GLOBAL day numbering across the entire trip (Day 1, 2, 3... up to ${totalDays}) NOT per-city numbering
- Each day must have a "title" field with thematic title (5-7 words) that summarizes the day's activities
- Use the selected activities for each city
- Distribute activities logically across the allocated days
- Consider travel preferences when organizing activities
- Include practical details like timing and locations
- Make sure each day has a reasonable number of activities (2-4 per day)
- Consider geographical proximity when scheduling activities within a day
- Use time slots: Morning, Afternoon, Evening
- For each city, include exactly 7 hotels ranging from budget to luxury
- Hotels should have: name, priceRange (e.g. "$50-100/night"), category (Budget/Mid-range/Luxury), and short description
- Include a variety of hotel types: hostels, business hotels, ryokans, luxury resorts, etc.
- Return ONLY valid JSON, no additional text or formatting`;
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = generatePrompt();
      const response = await callOpenAI(prompt);

      // Parse JSON response
      const parsedItinerary = JSON.parse(response);
      onGenerateItinerary(parsedItinerary);
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
