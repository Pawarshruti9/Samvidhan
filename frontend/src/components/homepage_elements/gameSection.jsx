import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./gameSection.css";
import image3 from "../../assets/thinkdrop.jpg";
import image4 from "../../assets/memorygame.png";

const GameSection = () => {
  const { t } = useTranslation(); // Get translation function

  const gameData = [
    { 
      title: t("games.hangman.title"), 
      description: t("games.hangman.description"), 
      image: image3,
      link: "https://pawarshruti9.github.io/Drag_And_Drop/" // Updated Hangman game link
    },
    { 
      title: "Memory Game", 
      description: "Test your memory by matching pairs of cards related to the Indian Constitution", 
      image: image4,
      link: "https://pawarshruti9.github.io/MemoryGame"
    }
  ];

  const handlePlayNow = (link) => {
    if (link !== "#") {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="game-section">
      {/* Header Section */}
      <div className="game-header">
        <h2>{t("games.heading")}</h2>
        <p>{t("games.description")}</p>
      </div>

      {/* Cards Section */}
      <div className="game-cards-container">
        {gameData.map((game, index) => (
          <div className="game-card" key={index}>
            {/* Game Image */}
            <div className="game-image">
              <img src={game.image} alt={game.title} />
            </div>

            {/* Game Content */}
            <div className="game-card-content">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <button 
                className="cta-button"
                onClick={() => handlePlayNow(game.link)}
              >
                {t("games.playNow")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameSection;
