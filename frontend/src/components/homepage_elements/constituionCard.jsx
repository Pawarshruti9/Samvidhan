import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import translation hook
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./constitutionCard.css";

const ConstitutionCards = () => {
  const { t } = useTranslation(); // Get translation function
  const navigate = useNavigate(); // Get navigation function

  const constitutionData = [
    { 
      title: t("constitution.preamble.title"), 
      description: t("constitution.preamble.description"),
      path: "/module/preamble"
    },
    { 
      title: t("constitution.fundamentalRights.title"), 
      description: t("constitution.fundamentalRights.description"),
      path: "/module/fundamental-rights"
    },
    { 
      title: t("constitution.directivePrinciples.title"), 
      description: t("constitution.directivePrinciples.description"),
      path: "/module/directive-principles"
    },
    { 
      title: t("constitution.fundamentalDuties.title"), 
      description: t("constitution.fundamentalDuties.description"),
      path: "/module/fundamental-duties"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="constitution-section">
      {/* Heading Section */}
      <div className="constitution-header">
        {/* Left Side: Title & Subheading */}
        <div className="header-left">
          <h2>{t("constitution.heading")}</h2>
          <h4>{t("constitution.subheading")}</h4>
        </div>

        {/* Right Side: Paragraph */}
        <div className="header-right">
          <p>{t("constitution.description")}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        {constitutionData.map((item, index) => (
          <div 
            className="constitution-card" 
            key={index}
            onClick={() => handleCardClick(item.path)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            {/* Next Icon */}
            <FaArrowRight className="next-icon" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConstitutionCards;
