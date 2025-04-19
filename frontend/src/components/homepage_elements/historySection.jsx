import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./historySection.css";
import historyImage from "../../assets/history.jpeg";

const HistorySection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Get translation function

  return (
    <section className="history-section">
      {/* Background Overlay */}
      <div className="history-overlay"></div>

      <div className="history-container">
        {/* Left Side - Content */}
        <div className="history-content">
          <h2 className="history-title">{t("historySection.title")}</h2>
          <p className="history-description">{t("historySection.description")}</p>
          <button className="read-more-btn" onClick={() => navigate("/history")}>
            {t("historySection.button")}
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="history-image-container">
          <img src={historyImage} alt="History of Constitution" className="history-image" />
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
