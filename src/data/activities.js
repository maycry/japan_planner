// Activity data for each city
// Helper function to get photo URLs based on activity name and type
const getActivityPhoto = (name, type) => {
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

    // Osaka
    "Osaka Castle":
      "https://images.unsplash.com/photo-1589952283406-b53a7a1be2eb?w=300&h=200&fit=crop",
    "Dotonbori District":
      "https://images.unsplash.com/photo-1533650733447-54c7ae69ee66?w=300&h=200&fit=crop",
    "Kuromon Market":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",

    // Hiroshima
    "Peace Memorial Park":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Atomic Bomb Dome":
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=200&fit=crop",
    "Miyajima Island":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Itsukushima Shrine":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",

    // Nara
    "Todai-ji Temple":
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop",
    "Nara Park":
      "https://images.unsplash.com/photo-1566400799264-631e3be96e11?w=300&h=200&fit=crop",
    "Deer Feeding":
      "https://images.unsplash.com/photo-1566400799264-631e3be96e11?w=300&h=200&fit=crop",
    "Kasuga Taisha":
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
  };

  return (
    typePhotos[type] ||
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop"
  );
};

// Activity data for each city
export const cityActivities = {
  1: [
    // Tokyo
    { id: 1, name: "Senso-ji Temple", type: "Temple & Shrine", selected: true },
    {
      id: 2,
      name: "Tokyo Skytree",
      type: "Modern Architecture",
      selected: true,
    },
    {
      id: 3,
      name: "Tsukiji Outer Market",
      type: "Local Markets",
      selected: true,
    },
    { id: 4, name: "Meiji Shrine", type: "Temple & Shrine", selected: true },
    { id: 5, name: "Shibuya Crossing", type: "Photography", selected: true },
    { id: 6, name: "Tokyo National Museum", type: "Museums", selected: true },
    { id: 7, name: "Harajuku District", type: "Pop Culture", selected: true },
    { id: 8, name: "Ginza Shopping", type: "Shopping", selected: false },
    {
      id: 9,
      name: "Tokyo Tower",
      type: "Modern Architecture",
      selected: false,
    },
    { id: 10, name: "Ueno Park", type: "Nature & Hiking", selected: false },
    {
      id: 11,
      name: "Kabuki Performance",
      type: "Traditional Arts",
      selected: false,
    },
    { id: 12, name: "Tokyo Bay Cruise", type: "Photography", selected: false },
    { id: 13, name: "Robot Restaurant", type: "Nightlife", selected: false },
    {
      id: 14,
      name: "Sushi Making Class",
      type: "Japanese Cuisine",
      selected: false,
    },
  ],
  2: [
    // Kyoto
    {
      id: 15,
      name: "Fushimi Inari Shrine",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 16, name: "Bamboo Grove", type: "Nature & Hiking", selected: true },
    {
      id: 17,
      name: "Kinkaku-ji Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 18, name: "Gion District", type: "Traditional Arts", selected: true },
    { id: 19, name: "Nishiki Market", type: "Local Markets", selected: true },
    {
      id: 20,
      name: "Kyoto Imperial Palace",
      type: "Historical Sites",
      selected: true,
    },
    { id: 21, name: "Tea Ceremony", type: "Traditional Arts", selected: true },
    {
      id: 22,
      name: "Philosopher's Path",
      type: "Nature & Hiking",
      selected: false,
    },
    { id: 23, name: "Kyoto National Museum", type: "Museums", selected: false },
    { id: 24, name: "Sake Tasting", type: "Japanese Cuisine", selected: false },
    {
      id: 25,
      name: "Kimono Rental",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 26,
      name: "Pottery Workshop",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 27,
      name: "Night Photography Tour",
      type: "Photography",
      selected: false,
    },
    {
      id: 28,
      name: "Kyoto Station Shopping",
      type: "Shopping",
      selected: false,
    },
  ],
  3: [
    // Osaka
    { id: 29, name: "Osaka Castle", type: "Historical Sites", selected: true },
    { id: 30, name: "Dotonbori District", type: "Nightlife", selected: true },
    { id: 31, name: "Kuromon Market", type: "Local Markets", selected: true },
    {
      id: 32,
      name: "Takoyaki Cooking",
      type: "Japanese Cuisine",
      selected: true,
    },
    {
      id: 33,
      name: "Sumiyoshi Taisha",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 34, name: "Osaka Aquarium", type: "Museums", selected: true },
    { id: 35, name: "Universal Studios", type: "Pop Culture", selected: false },
    {
      id: 36,
      name: "Shinsaibashi Shopping",
      type: "Shopping",
      selected: false,
    },
    {
      id: 37,
      name: "Osaka Bay Area",
      type: "Modern Architecture",
      selected: false,
    },
    {
      id: 38,
      name: "Street Food Tour",
      type: "Japanese Cuisine",
      selected: false,
    },
    {
      id: 39,
      name: "Bunraku Theater",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 40,
      name: "Namba Parks",
      type: "Modern Architecture",
      selected: false,
    },
    { id: 41, name: "Osaka Museum", type: "Museums", selected: false },
    { id: 42, name: "Karaoke Night", type: "Nightlife", selected: false },
  ],
  4: [
    // Hiroshima
    {
      id: 43,
      name: "Peace Memorial Park",
      type: "Historical Sites",
      selected: true,
    },
    {
      id: 44,
      name: "Atomic Bomb Dome",
      type: "Historical Sites",
      selected: true,
    },
    {
      id: 45,
      name: "Miyajima Island",
      type: "Nature & Hiking",
      selected: true,
    },
    {
      id: 46,
      name: "Itsukushima Shrine",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 47, name: "Peace Memorial Museum", type: "Museums", selected: true },
    {
      id: 48,
      name: "Okonomiyaki Cooking",
      type: "Japanese Cuisine",
      selected: true,
    },
    {
      id: 49,
      name: "Mount Misen Hike",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 50,
      name: "Hiroshima Castle",
      type: "Historical Sites",
      selected: false,
    },
    {
      id: 51,
      name: "Shukkeien Garden",
      type: "Nature & Hiking",
      selected: false,
    },
    { id: 52, name: "Hiroshima Museum", type: "Museums", selected: false },
    {
      id: 53,
      name: "Local Sake Tasting",
      type: "Japanese Cuisine",
      selected: false,
    },
    {
      id: 54,
      name: "Paper Crane Workshop",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 55,
      name: "Sunset Photography",
      type: "Photography",
      selected: false,
    },
    { id: 56, name: "Hiroshima Shopping", type: "Shopping", selected: false },
  ],
  5: [
    // Nara
    {
      id: 57,
      name: "Todai-ji Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 58, name: "Nara Park", type: "Nature & Hiking", selected: true },
    { id: 59, name: "Deer Feeding", type: "Nature & Hiking", selected: true },
    { id: 60, name: "Kasuga Taisha", type: "Temple & Shrine", selected: true },
    { id: 61, name: "Nara National Museum", type: "Museums", selected: true },
    {
      id: 62,
      name: "Kofuku-ji Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    {
      id: 63,
      name: "Mount Wakakusa",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 64,
      name: "Naramachi District",
      type: "Historical Sites",
      selected: false,
    },
    {
      id: 65,
      name: "Traditional Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    { id: 66, name: "Local Markets", type: "Local Markets", selected: false },
    { id: 67, name: "Photography Walk", type: "Photography", selected: false },
    {
      id: 68,
      name: "Buddha Statue Tour",
      type: "Historical Sites",
      selected: false,
    },
    {
      id: 69,
      name: "Garden Meditation",
      type: "Traditional Arts",
      selected: false,
    },
    { id: 70, name: "Souvenir Shopping", type: "Shopping", selected: false },
  ],
  6: [
    // Nikko
    { id: 71, name: "Toshogu Shrine", type: "Temple & Shrine", selected: true },
    { id: 72, name: "Lake Chuzenji", type: "Nature & Hiking", selected: true },
    { id: 73, name: "Kegon Falls", type: "Nature & Hiking", selected: true },
    {
      id: 74,
      name: "Rinnai-ji Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 75, name: "Cedar Avenue", type: "Nature & Hiking", selected: true },
    {
      id: 76,
      name: "Traditional Ryokan",
      type: "Traditional Arts",
      selected: true,
    },
    {
      id: 77,
      name: "Hot Spring Bath",
      type: "Onsen (Hot Springs)",
      selected: false,
    },
    { id: 78, name: "Hiking Trails", type: "Nature & Hiking", selected: false },
    { id: 79, name: "Nikko Museum", type: "Museums", selected: false },
    { id: 80, name: "Local Crafts", type: "Traditional Arts", selected: false },
    {
      id: 81,
      name: "Nature Photography",
      type: "Photography",
      selected: false,
    },
    {
      id: 82,
      name: "Waterfall Viewing",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 83,
      name: "Temple Complex Tour",
      type: "Historical Sites",
      selected: false,
    },
    { id: 84, name: "Local Markets", type: "Local Markets", selected: false },
  ],
  7: [
    // Hakone
    { id: 85, name: "Hakone Shrine", type: "Temple & Shrine", selected: true },
    { id: 86, name: "Lake Ashi", type: "Nature & Hiking", selected: true },
    { id: 87, name: "Pirate Ship Cruise", type: "Photography", selected: true },
    {
      id: 88,
      name: "Onsen Experience",
      type: "Onsen (Hot Springs)",
      selected: true,
    },
    { id: 89, name: "Mount Fuji Views", type: "Photography", selected: true },
    { id: 90, name: "Hakone Ropeway", type: "Nature & Hiking", selected: true },
    { id: 91, name: "Open Air Museum", type: "Museums", selected: false },
    {
      id: 92,
      name: "Owakudani Valley",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 93,
      name: "Traditional Ryokan",
      type: "Traditional Arts",
      selected: false,
    },
    { id: 94, name: "Art Museums", type: "Museums", selected: false },
    {
      id: 95,
      name: "Hot Spring Hopping",
      type: "Onsen (Hot Springs)",
      selected: false,
    },
    { id: 96, name: "Hiking Trails", type: "Nature & Hiking", selected: false },
    { id: 97, name: "Local Crafts", type: "Traditional Arts", selected: false },
    {
      id: 98,
      name: "Scenic Photography",
      type: "Photography",
      selected: false,
    },
  ],
  8: [
    // Takayama
    {
      id: 99,
      name: "Takayama Jinya",
      type: "Historical Sites",
      selected: true,
    },
    {
      id: 100,
      name: "Sanmachi Suji",
      type: "Historical Sites",
      selected: true,
    },
    { id: 101, name: "Morning Markets", type: "Local Markets", selected: true },
    {
      id: 102,
      name: "Sake Brewery Tour",
      type: "Japanese Cuisine",
      selected: true,
    },
    {
      id: 103,
      name: "Hida Folk Village",
      type: "Traditional Arts",
      selected: true,
    },
    {
      id: 104,
      name: "Hida Beef Tasting",
      type: "Japanese Cuisine",
      selected: true,
    },
    {
      id: 105,
      name: "Traditional Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 106,
      name: "Mountain Hiking",
      type: "Nature & Hiking",
      selected: false,
    },
    { id: 107, name: "Local Museums", type: "Museums", selected: false },
    { id: 108, name: "Photography Walk", type: "Photography", selected: false },
    {
      id: 109,
      name: "Hot Springs",
      type: "Onsen (Hot Springs)",
      selected: false,
    },
    {
      id: 110,
      name: "Temple Visits",
      type: "Temple & Shrine",
      selected: false,
    },
    { id: 111, name: "Local Shopping", type: "Shopping", selected: false },
    {
      id: 112,
      name: "Cultural Workshops",
      type: "Traditional Arts",
      selected: false,
    },
  ],
  9: [
    // Kanazawa
    {
      id: 113,
      name: "Kenroku-en Garden",
      type: "Nature & Hiking",
      selected: true,
    },
    {
      id: 114,
      name: "Kanazawa Castle",
      type: "Historical Sites",
      selected: true,
    },
    {
      id: 115,
      name: "Higashi Chaya",
      type: "Traditional Arts",
      selected: true,
    },
    { id: 116, name: "Omicho Market", type: "Local Markets", selected: true },
    {
      id: 117,
      name: "Gold Leaf Workshop",
      type: "Traditional Arts",
      selected: true,
    },
    { id: 118, name: "21st Century Museum", type: "Museums", selected: true },
    {
      id: 119,
      name: "Geisha Districts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 120,
      name: "Tea House Visit",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 121,
      name: "Local Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 122,
      name: "Sushi Experience",
      type: "Japanese Cuisine",
      selected: false,
    },
    {
      id: 123,
      name: "Garden Photography",
      type: "Photography",
      selected: false,
    },
    { id: 124, name: "Cultural Museums", type: "Museums", selected: false },
    { id: 125, name: "Shopping Districts", type: "Shopping", selected: false },
    { id: 126, name: "Night Markets", type: "Local Markets", selected: false },
  ],
  10: [
    // Miyajima
    {
      id: 127,
      name: "Itsukushima Shrine",
      type: "Temple & Shrine",
      selected: true,
    },
    { id: 128, name: "Floating Torii", type: "Photography", selected: true },
    { id: 129, name: "Mount Misen", type: "Nature & Hiking", selected: true },
    { id: 130, name: "Deer Park", type: "Nature & Hiking", selected: true },
    {
      id: 131,
      name: "Daisho-in Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    {
      id: 132,
      name: "Island Photography",
      type: "Photography",
      selected: true,
    },
    { id: 133, name: "Ropeway Ride", type: "Nature & Hiking", selected: false },
    { id: 134, name: "Local Markets", type: "Local Markets", selected: false },
    { id: 135, name: "Sunset Viewing", type: "Photography", selected: false },
    {
      id: 136,
      name: "Traditional Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 137,
      name: "Island Hiking",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 138,
      name: "Cultural Sites",
      type: "Historical Sites",
      selected: false,
    },
    { id: 139, name: "Local Food", type: "Japanese Cuisine", selected: false },
    { id: 140, name: "Souvenir Shopping", type: "Shopping", selected: false },
  ],
  11: [
    // Fujikawaguchiko
    { id: 141, name: "Mount Fuji Views", type: "Photography", selected: true },
    {
      id: 142,
      name: "Lake Kawaguchi",
      type: "Nature & Hiking",
      selected: true,
    },
    { id: 143, name: "Chureito Pagoda", type: "Photography", selected: true },
    {
      id: 144,
      name: "Onsen with Fuji View",
      type: "Onsen (Hot Springs)",
      selected: true,
    },
    {
      id: 145,
      name: "Fuji Five Lakes",
      type: "Nature & Hiking",
      selected: true,
    },
    { id: 146, name: "Kawaguchi Museum", type: "Museums", selected: true },
    {
      id: 147,
      name: "Hiking Trails",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 148,
      name: "Photography Tours",
      type: "Photography",
      selected: false,
    },
    {
      id: 149,
      name: "Local Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 150,
      name: "Scenic Drives",
      type: "Nature & Hiking",
      selected: false,
    },
    {
      id: 151,
      name: "Traditional Ryokan",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 152,
      name: "Lake Activities",
      type: "Nature & Hiking",
      selected: false,
    },
    { id: 153, name: "Mountain Views", type: "Photography", selected: false },
    { id: 154, name: "Local Markets", type: "Local Markets", selected: false },
  ],
  12: [
    // Kamakura
    { id: 155, name: "Great Buddha", type: "Historical Sites", selected: true },
    { id: 156, name: "Hase Temple", type: "Temple & Shrine", selected: true },
    { id: 157, name: "Bamboo Forest", type: "Nature & Hiking", selected: true },
    {
      id: 158,
      name: "Enoshima Island",
      type: "Nature & Hiking",
      selected: true,
    },
    { id: 159, name: "Komachi Street", type: "Shopping", selected: true },
    {
      id: 160,
      name: "Hokokuji Temple",
      type: "Temple & Shrine",
      selected: true,
    },
    {
      id: 161,
      name: "Beach Activities",
      type: "Nature & Hiking",
      selected: false,
    },
    { id: 162, name: "Local Markets", type: "Local Markets", selected: false },
    { id: 163, name: "Photography Walk", type: "Photography", selected: false },
    {
      id: 164,
      name: "Traditional Crafts",
      type: "Traditional Arts",
      selected: false,
    },
    {
      id: 165,
      name: "Temple Complex",
      type: "Historical Sites",
      selected: false,
    },
    { id: 166, name: "Local Food", type: "Japanese Cuisine", selected: false },
    { id: 167, name: "Cultural Sites", type: "Museums", selected: false },
    { id: 168, name: "Coastal Views", type: "Photography", selected: false },
  ],
};
