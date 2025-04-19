import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./gameSection.css";
import image1 from "../../assets/img1.jpeg";
import image2 from "../../assets/word-scramble.jpeg";
import image3 from "../../assets/hangman.jpeg";

const GameSection = () => {
  const { t } = useTranslation(); // Get translation function

  const gameData = [
    { title: t("games.spinWheel.title"), description: t("games.spinWheel.description"), image: image1 },
    { title: t("games.wordScramble.title"), description: t("games.wordScramble.description"), image: image2 },
    { title: t("games.hangman.title"), description: t("games.hangman.description"), image: image3 }
  ];

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
              <button className="cta-button">{t("games.playNow")}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameSection;
