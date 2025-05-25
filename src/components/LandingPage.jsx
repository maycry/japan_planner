import React, { useEffect, useState } from "react";

function LandingPage({ onStartPlanning }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-placeholder">
            <div className="logo-box">Your Logo</div>
          </div>
          <nav className="header-nav">
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
          </nav>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Plan Your Perfect
            <span className="title-highlight"> Japan Adventure</span>
          </h1>

          <p className="hero-subtitle">
            Create a personalized itinerary for your dream trip to Japan. From
            bustling Tokyo to serene Kyoto, discover the best of Japan tailored
            to your preferences.
          </p>

          <button className="cta-button" onClick={onStartPlanning}>
            Start Planning
            <span className="cta-arrow">→</span>
          </button>

          <div className="feature-highlights">
            <div className="feature-item">
              <span className="feature-icon">🏙️</span>
              <span className="feature-text">Multiple Cities</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Personalized</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span className="feature-text">Day-by-Day</span>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-text">Scroll to explore</div>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>

        <div className="hero-background">
          <div
            className="floating-element element-1"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${
                mousePosition.y * 0.02
              }px)`,
            }}
          >
            🏯
          </div>
          <div
            className="floating-element element-2"
            style={{
              transform: `translate(${mousePosition.x * -0.015}px, ${
                mousePosition.y * -0.015
              }px)`,
            }}
          >
            🌸
          </div>
          <div
            className="floating-element element-3"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${
                mousePosition.y * 0.01
              }px)`,
            }}
          >
            🗾
          </div>
          <div
            className="floating-element element-4"
            style={{
              transform: `translate(${mousePosition.x * -0.02}px, ${
                mousePosition.y * -0.02
              }px)`,
            }}
          >
            🍱
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
