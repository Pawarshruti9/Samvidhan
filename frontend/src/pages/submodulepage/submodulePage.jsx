import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useTranslation } from "react-i18next";
import englishData from "../../locales/english.json";
import hindiData from "../../locales/hindi.json";
import "./submodulePage.css";

const SubmodulePage = () => {
  const { moduleName, submoduleIndex } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [content, setContent] = useState(
    englishData.module[moduleName]?.submodules[submoduleIndex] ||
      englishData.module["preamble"].submodules[0]
  );

  const isLastSubmodule =
    parseInt(submoduleIndex) === englishData.module[moduleName].submodules.length - 1;

    const handleNext = () => {
        if (isLastSubmodule) {
            navigate(`/module/${moduleName}/quiz`);
        } else {
            navigate(`/module/${moduleName}/submodule/${parseInt(submoduleIndex) + 1}`);
        }
    };

  // Load content dynamically based on the selected language
  useEffect(() => {
    const selectedData = i18n.language === "hi" ? hindiData.module : englishData.module;
    setContent(
      selectedData[moduleName]?.submodules[submoduleIndex] ||
        selectedData["preamble"].submodules[0]
    );
  }, [i18n.language, moduleName, submoduleIndex]);

  return (
    <div className="submodule-page">
        <Navbar />

        {/* YouTube Video */}
        <div className="submodule-video-container">
            <iframe
            src={content.video}
            title="Submodule Video"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </div>

        {/* Theory Section */}
        <div className="submodule-theory-section">
            <h2>{content.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content.theory }}></div>
        </div>

        {/* Buttons Section */}
        <div className="submodule-buttons">
            <button
                className="submodule-download-btn"
                onClick={() => window.location.href = content.file}
                >
                Download File
            </button>
            {submoduleIndex > 0 && (
                <button onClick={() => navigate(`/module/${moduleName}/submodule/${parseInt(submoduleIndex) - 1}`)}>
                ⬅️ Previous
                </button>
            )}
            {parseInt(submoduleIndex) < englishData.module[moduleName].submodules.length - 1 ? (
                <button onClick={() => navigate(`/module/${moduleName}/submodule/${parseInt(submoduleIndex) + 1}`)}>
                    Next ➡️
                </button>
            ) : (
                <button onClick={() => navigate(`/module/${moduleName}/quiz`)}>
                    📖 Take Quiz
                </button>
            )}
        </div>
    </div>

  );
};

export default SubmodulePage;
