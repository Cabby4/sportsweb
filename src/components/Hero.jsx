import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    category: "FOOTBALL",
    title: "Latest Sports News, Updates & Stories",
    description:
      "Stay up to date with the latest football news, transfers, fixtures, results and stories from around the world.",
    image: "/hero-football.jpg",
    primaryText: "Read Latest News",
    primaryLink: "/news",
    secondaryText: "View Fixtures",
    secondaryLink: "/fixtures",
  },
  {
    id: 2,
    category: "TRANSFER CENTRE",
    title: "Follow Every Transfer Story",
    description:
      "Keep up with transfer news, player movements, rumours and the latest stories from the football market.",
    image: "/hero-transfers.jpg",
    primaryText: "View Transfers",
    primaryLink: "/transfers",
    secondaryText: "Football Hub",
    secondaryLink: "/football",
  },
  {
    id: 3,
    category: "MATCH CENTRE",
    title: "Fixtures, Results & Match Updates",
    description:
      "Follow upcoming fixtures, recent results and match information from competitions around the football world.",
    image: "/hero-matchday.jpg",
    primaryText: "View Fixtures",
    primaryLink: "/fixtures",
    secondaryText: "View Results",
    secondaryLink: "/results",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="cabby-hero">

      {/* Background Images */}
      <div className="cabby-hero-backgrounds">
        {slides.map((item, index) => (
          <div
            key={item.id}
            className={`cabby-hero-background ${
              index === currentSlide ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          />
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="cabby-hero-overlay">

        <div className="container">
          <div className="cabby-hero-content">

            <div
              key={slide.id}
              className="cabby-hero-text"
            >
              <span className="cabby-hero-category">
                {slide.category}
              </span>

              <h1>{slide.title}</h1>

              <p>{slide.description}</p>

              <div className="cabby-hero-actions">

                <Link
                  to={slide.primaryLink}
                  className="cabby-primary-btn"
                >
                  {slide.primaryText}

                  <span>→</span>
                </Link>

                <Link
                  to={slide.secondaryLink}
                  className="cabby-secondary-btn"
                >
                  {slide.secondaryText}
                </Link>

              </div>
            </div>

          </div>
        </div>

        {/* Previous */}
        <button
          type="button"
          className="cabby-hero-arrow cabby-hero-prev"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>

        {/* Next */}
        <button
          type="button"
          className="cabby-hero-arrow cabby-hero-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Slide Controls */}
        <div className="cabby-hero-controls">

        </div>

      </div>
    </section>
  );
};

export default Hero;