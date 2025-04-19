import React from "react";
import { useTranslation } from "react-i18next";
import "./section3.css";
import draftingImage from "../../assets/section3.jpeg"; // Replace with an actual image

const Section3 = () => {
  const { t } = useTranslation(); // Translation Hook

  return (
    <section className="section3">
      <div className="section3-container">
        {/* Numbering & Content */}
        <div className="section3-content">
          <h2 className="section3-title">{t("history.section3.title")}</h2>
          <p className="section3-description">{t("history.section3.description")}</p>
        </div>

        {/* Image Section */}
        <div className="section3-image-container">
          <img src={draftingImage} alt="Drafting the Constitution" className="section3-image" />
        </div>
      </div>
    </section>
  );
};

export default Section3;
