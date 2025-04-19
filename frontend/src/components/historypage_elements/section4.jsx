import React from "react";
import { useTranslation } from "react-i18next";
import "./section4.css";
import adoptionImage from "../../assets/adoption.jpg"; 
import implementationImage from "../../assets/implementation.jpeg"; 

const Section4 = () => {
  const { t } = useTranslation();

  return (
    <section className="constitution-section">
      <div className="constitution-container">
        {/* Adoption of the Constitution */}
        <div className="constitution-card">
          <div className="constitution-image">
            <img src={adoptionImage} alt="Adoption of Constitution" />
          </div>
          <div className="constitution-content">
            <h2 className="constitution-title">{t("history.section4.adoptionTitle")}</h2>
            <p className="constitution-description">{t("history.section4.adoptionDescription")}</p>
          </div>
        </div>

        {/* Constitution Comes into Effect */}
        <div className="constitution-card">
          <div className="constitution-image">
            <img src={implementationImage} alt="Constitution Comes into Effect" />
          </div>
          <div className="constitution-content">
            <h2 className="constitution-title">{t("history.section4.effectTitle")}</h2>
            <p className="constitution-description">{t("history.section4.effectDescription")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
