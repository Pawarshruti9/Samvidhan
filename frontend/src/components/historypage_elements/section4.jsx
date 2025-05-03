import React from "react";
import { useTranslation } from "react-i18next";
import "./section4.css";
import adoptionImage from "../../assets/adoption.jpg"; 
import implementationImage from "../../assets/implementation.jpeg"; 

const Section4 = () => {
  const { t } = useTranslation();

  return (
    <section className="section4">
      <div className="section4-container">
        <div className="section4-cards">
          {/* Adoption of the Constitution */}
          <div className="section4-card">
            <h3 className="section4-card-title">{t("history.section4.adoptionTitle")}</h3>
            <p className="section4-card-description">{t("history.section4.adoptionDescription")}</p>
            <div className="section4-card-image">
              <img src={adoptionImage} alt="Adoption of Constitution" />
            </div>
          </div>

          {/* Constitution Comes into Effect */}
          <div className="section4-card">
            <h3 className="section4-card-title">{t("history.section4.effectTitle")}</h3>
            <p className="section4-card-description">{t("history.section4.effectDescription")}</p>
            <div className="section4-card-image">
              <img src={implementationImage} alt="Constitution Comes into Effect" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
