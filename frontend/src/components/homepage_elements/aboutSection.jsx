import { useTranslation } from "react-i18next"; // Import i18next hook
import "./aboutSection.css";
import { FaBalanceScale, FaUsers, FaGavel, FaHandHoldingHeart } from "react-icons/fa";

const AboutSection = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <section className="about">
      <div className="about-container">
        {/* Left Side - Content */}
        <div className="about-content">
          <h1>{t("about.title")}</h1>
          <p>{t("about.description")}</p>

          {/* Key Pillars Section */}
          <div className="pillars">
            <div className="pillar">
              <FaBalanceScale className="pillar-icon" />
              <h3>{t("about.pillars.protectingRights.title")}</h3>
              <p>{t("about.pillars.protectingRights.description")}</p>
            </div>
            <div className="pillar">
              <FaUsers className="pillar-icon" />
              <h3>{t("about.pillars.definingResponsibilities.title")}</h3>
              <p>{t("about.pillars.definingResponsibilities.description")}</p>
            </div>
            <div className="pillar">
              <FaGavel className="pillar-icon" />
              <h3>{t("about.pillars.guidingGovernance.title")}</h3>
              <p>{t("about.pillars.guidingGovernance.description")}</p>
            </div>
            <div className="pillar">
              <FaHandHoldingHeart className="pillar-icon" />
              <h3>{t("about.pillars.promotingSocialJustice.title")}</h3>
              <p>{t("about.pillars.promotingSocialJustice.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
