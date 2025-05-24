import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LandingPage({ onStartPlanning }) {
  // Beautiful Japan photos for the carousel
  const japanPhotos = [
    {
      url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=600&fit=crop",
      alt: "Fushimi Inari Shrine torii gates"
    },
    {
      url: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=600&fit=crop",
      alt: "Bamboo grove in Kyoto"
    },
    {
      url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&h=600&fit=crop",
      alt: "Golden Pavilion Kinkaku-ji"
    },
    {
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=600&fit=crop",
      alt: "Tokyo Skytree at sunset"
    },
    {
      url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&h=600&fit=crop",
      alt: "Shibuya crossing at night"
    },
    {
      url: "https://images.unsplash.com/photo-1566400799264-631e3be96e11?w=1200&h=600&fit=crop",
      alt: "Deer in Nara Park"
    },
    {
      url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&h=600&fit=crop",
      alt: "Traditional Japanese temple"
    },
    {
      url: "https://images.unsplash.com/photo-1589952283406-b53a7a1be2eb?w=1200&h=600&fit=crop",
      alt: "Osaka Castle surrounded by cherry blossoms"
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-placeholder">
            <div className="logo-icon">🗾</div>
            <span className="logo-text">Japan Planner</span>
          </div>
          <nav className="header-nav">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Plan Your Perfect
            <span className="hero-title-accent"> Japan Adventure</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered travel planning that creates personalized itineraries 
            based on your preferences, interests, and travel style. 
            Discover the beauty of Japan with a plan made just for you.
          </p>
          <button className="cta-button" onClick={onStartPlanning}>
            <span>Start Planning</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">AI-Powered</div>
              <div className="stat-label">Smart Planning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="photo-carousel-section">
        <h2 className="carousel-title">Discover Japan's Beauty</h2>
        <div className="carousel-container">
          <Slider {...carouselSettings}>
            {japanPhotos.map((photo, index) => (
              <div key={index} className="carousel-slide">
                <div className="slide-image-container">
                  <img 
                    src={photo.url} 
                    alt={photo.alt}
                    className="slide-image"
                  />
                  <div className="slide-overlay">
                    <p className="slide-caption">{photo.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-content">
          <h2 className="features-title">Why Choose Our Planner?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Planning</h3>
              <p>Our advanced AI analyzes your preferences to create the perfect itinerary tailored just for you.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Local Insights</h3>
              <p>Discover hidden gems and authentic experiences that only locals know about.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Smart Scheduling</h3>
              <p>Optimized timing and logistics to make the most of your time in Japan.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Personalized Experience</h3>
              <p>From temples to technology, culture to cuisine - your interests guide every recommendation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="cta-footer">
        <div className="cta-footer-content">
          <h2>Ready to Explore Japan?</h2>
          <p>Start planning your dream trip today with our AI-powered travel planner.</p>
          <button className="cta-button secondary" onClick={onStartPlanning}>
            Begin Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
