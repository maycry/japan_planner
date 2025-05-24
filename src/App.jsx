import { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import PreferencesStep from "./components/PreferencesStep";
import CitiesStep from "./components/CitiesStep";
import ActivitiesStep from "./components/ActivitiesStep";
import ItineraryStep from "./components/ItineraryStep";
import GeneratedItineraryStep from "./components/GeneratedItineraryStep";
import { cityActivities } from "./data/activities";

const japanCities = [
  { id: 1, name: "Tokyo", region: "Kanto" },
  { id: 2, name: "Kyoto", region: "Kansai" },
  { id: 3, name: "Osaka", region: "Kansai" },
  { id: 4, name: "Hiroshima", region: "Chugoku" },
  { id: 5, name: "Nara", region: "Kansai" },
  { id: 6, name: "Nikko", region: "Kanto" },
  { id: 7, name: "Hakone", region: "Kanto" },
  { id: 8, name: "Takayama", region: "Chubu" },
  { id: 9, name: "Kanazawa", region: "Chubu" },
  { id: 10, name: "Miyajima", region: "Chugoku" },
  { id: 11, name: "Fujikawaguchiko", region: "Kanto" },
  { id: 12, name: "Kamakura", region: "Kanto" },
];

function App() {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for landing page
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedCities, setSelectedCities] = useState([
    {
      ...japanCities[0],
      days: 3,
      activities: cityActivities[1] || [],
    }, // Tokyo
    {
      ...japanCities[1],
      days: 2,
      activities: cityActivities[2] || [],
    }, // Kyoto
  ]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [expandedCityId, setExpandedCityId] = useState(null);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const otherCities = japanCities.filter(
    (city) => !selectedCities.find((selected) => selected.id === city.id)
  );

  const totalDays = selectedCities.reduce((sum, city) => sum + city.days, 0);
  const totalActivities = selectedCities.reduce(
    (sum, city) =>
      sum +
      (city.activities?.filter((activity) => activity.selected).length || 0),
    0
  );

  const togglePreference = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((p) => p !== preference)
        : [...prev, preference]
    );
  };

  const handlePreferencesContinue = () => {
    setCurrentStep(2);
  };

  const handleCitiesContinue = () => {
    setCurrentStep(3);
    // Set first city as expanded by default
    if (selectedCities.length > 0) {
      setExpandedCityId(selectedCities[0].id);
    }
  };

  const handleActivitiesContinue = () => {
    setCurrentStep(4);
  };

  const handleItineraryBack = () => {
    setCurrentStep(3);
  };

  const handleGenerateItinerary = (itinerary) => {
    setGeneratedItinerary(itinerary);
    setCurrentStep(5);
  };

  const handleGeneratedItineraryBack = () => {
    setCurrentStep(4);
  };

  const handleGeneratedItineraryRegenerate = () => {
    // Go back to step 4 to regenerate
    setCurrentStep(4);
  };

  const addCity = (city) => {
    const cityWithActivities = {
      ...city,
      days: 2,
      activities: cityActivities[city.id] || [],
    };
    setSelectedCities((prev) => [...prev, cityWithActivities]);
  };

  const removeCity = (cityId) => {
    setSelectedCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  const updateDays = (cityId, newDays) => {
    if (newDays < 1 || newDays > 20) return;
    setSelectedCities((prev) =>
      prev.map((city) =>
        city.id === cityId ? { ...city, days: newDays } : city
      )
    );
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) return;

    const newCities = [...selectedCities];
    const draggedCity = newCities[draggedItem];
    newCities.splice(draggedItem, 1);
    newCities.splice(dropIndex, 0, draggedCity);

    setSelectedCities(newCities);
    setDraggedItem(null);
  };

  const toggleCityExpansion = (cityId) => {
    setExpandedCityId(expandedCityId === cityId ? null : cityId);
  };

  const toggleActivity = (cityId, activityId) => {
    setSelectedCities((prev) =>
      prev.map((city) => {
        if (city.id === cityId) {
          return {
            ...city,
            activities: city.activities.map((activity) =>
              activity.id === activityId
                ? { ...activity, selected: !activity.selected }
                : activity
            ),
          };
        }
        return city;
      })
    );
  };

  // Handle landing page start planning
  const handleStartPlanning = () => {
    setCurrentStep(1);
  };

  if (currentStep === 0) {
    return (
      <div className="app">
        <LandingPage onStartPlanning={handleStartPlanning} />
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="app">
        <PreferencesStep
          selectedPreferences={selectedPreferences}
          onTogglePreference={togglePreference}
          onContinue={handlePreferencesContinue}
        />
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="app">
        <CitiesStep
          selectedCities={selectedCities}
          otherCities={otherCities}
          totalDays={totalDays}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onUpdateDays={updateDays}
          onRemoveCity={removeCity}
          onAddCity={addCity}
          onContinue={handleCitiesContinue}
        />
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="app">
        <ActivitiesStep
          selectedCities={selectedCities}
          expandedCityId={expandedCityId}
          totalDays={totalDays}
          totalActivities={totalActivities}
          onToggleCity={toggleCityExpansion}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onUpdateDays={updateDays}
          onRemoveCity={removeCity}
          onToggleActivity={toggleActivity}
          onContinue={handleActivitiesContinue}
        />
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="app">
        <ItineraryStep
          selectedPreferences={selectedPreferences}
          selectedCities={selectedCities}
          totalDays={totalDays}
          totalActivities={totalActivities}
          onBack={handleItineraryBack}
          onGenerateItinerary={handleGenerateItinerary}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <GeneratedItineraryStep
        selectedPreferences={selectedPreferences}
        selectedCities={selectedCities}
        totalDays={totalDays}
        totalActivities={totalActivities}
        generatedItinerary={generatedItinerary}
        onBack={handleGeneratedItineraryBack}
        onRegenerate={handleGeneratedItineraryRegenerate}
        isRegenerating={false}
      />
    </div>
  );
}

export default App;
