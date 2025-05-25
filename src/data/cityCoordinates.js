// City coordinates for mapping
export const cityCoordinates = {
  Tokyo: { lat: 35.6762, lng: 139.6503, region: "Kanto" },
  Kyoto: { lat: 35.0116, lng: 135.7681, region: "Kansai" },
  Osaka: { lat: 34.6937, lng: 135.5023, region: "Kansai" },
  Hiroshima: { lat: 34.3853, lng: 132.4553, region: "Chugoku" },
  Nara: { lat: 34.6851, lng: 135.8048, region: "Kansai" },
  Nikko: { lat: 36.7581, lng: 139.6289, region: "Kanto" },
  Hakone: { lat: 35.2336, lng: 139.1069, region: "Kanto" },
  Takayama: { lat: 36.1458, lng: 137.2514, region: "Chubu" },
  Kanazawa: { lat: 36.5944, lng: 136.6256, region: "Chubu" },
  Miyajima: { lat: 34.296, lng: 132.3199, region: "Chugoku" },
  Fujikawaguchiko: { lat: 35.5013, lng: 138.7639, region: "Kanto" },
  Kamakura: { lat: 35.3192, lng: 139.5469, region: "Kanto" },
};

// Helper function to get coordinates for a city
export const getCityCoordinates = (cityName) => {
  return cityCoordinates[cityName] || { lat: 35.6762, lng: 139.6503 }; // Default to Tokyo
};

// Helper function to get all coordinates for selected cities
export const getSelectedCitiesCoordinates = (selectedCities) => {
  return selectedCities.map((city) => ({
    ...city,
    coordinates: getCityCoordinates(city.name),
  }));
};
