import { useTranslation } from "react-i18next"; // Import i18next hook
import "./heroSection.css";
import HeroImage from "../../assets/hero_image.jpeg"; // Background Image

const Hero = () => {
  const { t } = useTranslation(); // Hook for translations

  return (
    <section className="hero">
        <div className="hero-content">
          <h2>{t("hero.heading")}</h2>
          <p>{t("hero.description")}</p>
          <p dangerouslySetInnerHTML={{ __html: t("hero.subDescription") }}></p>
          <a href="#learn-more" className="hero-btn">{t("hero.button")}</a>
      </div>
    </section>
  );
};

export default Hero;
