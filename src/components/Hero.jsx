import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    category: "FOOTBALL",
    title: "Latest Sports News, Updates & Stories",
    description:
      "Stay ahead of the game with the latest sports news, live updates, match results, fixtures, transfer news, and exclusive stories from the world of football and beyond. Get the latest insights, breaking headlines, and in-depth coverage of your favourite teams, players, and competitions with Cabby Sports. Your home for everything sports.",
    image: "/hero-football.jpg",
    primaryText: "Read Latest News",
    primaryLink: "/news",
    secondaryText: "Football Hub",
    secondaryLink: "/football",
  },
  {
    id: 2,
    category: "GRASSROOTS FOOTBALL",
    title: "Where Future Stars Are Born",
    description:
      "From local pitches to future stars, grassroots football is where talent begins and dreams grow. We celebrate the players, coaches, and communities building a stronger game, one match at a time. Discover emerging talents, local competitions, and inspiring stories shaping the future of football across Africa.",
    image: "/grassroot.png",
    primaryText: "Explore Grassroots",
    primaryLink: "/grassroots-football",
    secondaryText: "Africa Football",
    secondaryLink: "/africa-football",
  },
  {
    id: 3,
    category: "AFRICA FOOTBALL",
    title: "The Heart of African Football",
    description:
      "Stay connected to African football with the latest stories, continental competitions, club updates and the rising talents shaping the future of the game.",
    image: "/hero-matchday.jpg",
    primaryText: "Explore Africa Football",
    primaryLink: "/africa-football",
    secondaryText: "Grassroots Football",
    secondaryLink: "/grassroots-football",
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
    }, 15000);

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
            <div key={slide.id} className="cabby-hero-text">
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
        <div className="cabby-hero-controls"></div>
      </div>
    </section>
  );
};

export default Hero;