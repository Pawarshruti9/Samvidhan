import React from "react";
import { useTranslation } from "react-i18next";
import "./section2.css";
import assemblyBg from "../../assets/2.jpeg"; // Background Image

const Section2 = () => {
  const { t } = useTranslation(); // Translation Hook

  return (
    <section className="section2">
      {/* Background Image */}
      <div className="section2-bg" style={{ backgroundImage: `url(${assemblyBg})` }}></div>

      {/* Content Box */}
      <div className="section2-content">
        <h2 className="section2-title">{t("history.section2.title")}</h2>
        <p className="section2-description">{t("history.section2.description")}</p>
      </div>
    </section>
  );
};

export default Section2;
