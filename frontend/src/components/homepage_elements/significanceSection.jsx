import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import i18next hook
import "./significanceSection.css";
import Image1 from "../../assets/bas.jpeg";
import Image2 from "../../assets/image2.jpeg";

const SignificanceSection = () => {
  const { t } = useTranslation(); // Hook for translations
  const significanceData = t("significanceSection.points", { returnObjects: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out effect
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === significanceData.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false); // Start fade-in effect
      }, 500); // Fade out duration (should match CSS)
    }, 4000); // 4 seconds per card

    return () => clearInterval(interval);
  }, [significanceData.length]);

  return (
    <section className="significance">
      <div className="significance-container">
        {/* Left Section */}
        <div className="significance-left">
          <h2>{t("significanceSection.title")}</h2>
          <p>{t("significanceSection.description")}</p>
          <div className="image-container">
            <img src={Image1} alt="Constitution Representation" />
            <img src={Image2} alt="Constitution Representation" />
          </div>
        </div>

        {/* Right Section - Single Card with Fade Effect */}
        <div className="significance-right">
          <div className={`card ${fade ? "fade-out" : "fade-in"}`}>
            <h3>{significanceData[currentIndex].title}</h3>
            <h4>{significanceData[currentIndex].subTitle}</h4>
            <p>{significanceData[currentIndex].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignificanceSection;
