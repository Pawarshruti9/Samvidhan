import React from "react";
import { useTranslation } from "react-i18next";
import "./historyheroSection.css";
import historyBg from "../../assets/historyhero.jpeg"; // Replace with your image path

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${historyBg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{t("history.title")}</h1>
      </div>
    </section>
  );
};

export default HeroSection;
