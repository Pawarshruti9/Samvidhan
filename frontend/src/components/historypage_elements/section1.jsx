import React from "react";
import { useTranslation } from "react-i18next";
import "./section1.css";
import journeyImage from "../../assets/journey.jpeg"; // Add an image in assets

const Section1 = () => {
  const { t } = useTranslation();

  return (
    <section className="section1-container">
      {/* Left Side - Content */}
      <div className="section1-content">
        <h2 className="section1-title">{t("history.section1.title")}</h2>
        <p className="section1-description">
          {t("history.section1.description")}
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="section1-image-container">
        <img
          src={journeyImage}
          alt="The journey towards India's Constitution"
          className="section1-image"
        />
      </div>
    </section>
  );
};

export default Section1;
