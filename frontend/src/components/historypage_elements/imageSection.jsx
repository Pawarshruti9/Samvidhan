import React from "react";
import "./imageSection.css";
import img1 from "../../assets/1.jpeg";
import img2 from "../../assets/2.jpeg";
import img3 from "../../assets/3.jpeg";

const ImageSection = () => {
  return (
    <section className="image-section">
      <div className="image-grid">
        {/* Left side - Two stacked images */}
        <div className="left-images">
          <img src={img1} alt="Image 1" className="small-image" />
          <img src={img2} alt="Image 2" className="small-image" />
        </div>

        {/* Right side - One large image */}
        <div className="right-image">
          <img src={img3} alt="Image 3" className="large-image" />
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
