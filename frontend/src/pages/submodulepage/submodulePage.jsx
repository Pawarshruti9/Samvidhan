import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useTranslation } from "react-i18next";
import englishData from "../../locales/english.json";
import hindiData from "../../locales/hindi.json";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const updateProgress = async (status) => {
    try {
      console.log('Updating progress with:', { moduleName, status });
      const response = await axios.post(
        'http://localhost:4000/api/users/updateprogress',
        { moduleName, status },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Progress update response:', response.data);
      if (response.data.success) {
        toast.success('Progress updated successfully');
      } else {
        toast.error(response.data.message || 'Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update progress');
    }
  };

  const handleNext = async () => {
    // Update progress to inprogress when moving to next submodule
    await updateProgress('inprogress');

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
                <button onClick={handleNext}>
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
