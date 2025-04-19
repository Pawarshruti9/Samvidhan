import React from "react";
import { useTranslation } from "react-i18next"; // Import i18next hook
import "./bgSection.css";
import BackgroundImage from "../../assets/bg-image.jpeg"; // Use a high-quality image

const BgSection = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <section className="bg-section">
      <div className="overlay"></div> {/* Blackish overlay */}
      <div className="bg-content">
        <h2>{t("bgSection.title")}</h2>
        <p>{t("bgSection.description")}</p>
      </div>
    </section>
  );
};

export default BgSection;
