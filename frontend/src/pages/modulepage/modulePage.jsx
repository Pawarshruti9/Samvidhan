import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx"; // Import Navbar
import "./modulePage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModulePage = () => {
  const { moduleName } = useParams(); // Get module name from URL
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleContent = async () => {
      try {
        console.log('Fetching content for module:', moduleName);
        let formattedModuleName;
        if (moduleName === 'directive-principles') {
          formattedModuleName = 'Directive Principles of State Policy';
        } else {
          formattedModuleName = moduleName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
        
        console.log('Formatted module name:', formattedModuleName);
        const response = await axios.post(
          "http://localhost:4000/api/content/getbyname",
          { main_module: formattedModuleName },
          { withCredentials: true }
        );

        console.log('Raw response:', response);
        console.log('Response data:', response.data);
        console.log('Overview content:', response.data?.overview_content);
        console.log('Description:', response.data?.overview_content?.description);

        if (response.data && response.data.overview_content) {
          console.log('Received content:', response.data);
          setContent(response.data);
        } else {
          setError("Module content not found or incomplete");
          toast.error("Failed to fetch module content");
        }
      } catch (error) {
        console.error("Error fetching module content:", error);
        console.error("Error response:", error.response);
        setError(error.response?.data?.error || "Failed to fetch module content");
        toast.error("Failed to fetch module content");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleContent();
  }, [moduleName]);

  const started = async (e) => {
    e.preventDefault();
    try {
      // First update the progress status
      const progressResponse = await axios.post(
        "http://localhost:4000/api/test/statusstarted",
        { course: moduleName },
        { withCredentials: true }
      );

      console.log(progressResponse.data);
      toast.success("Module started successfully!", { autoClose: 2000 });
      
      // Navigate to the first submodule
      setTimeout(() => {
        navigate(`/module/${moduleName}/submodule/0`);
      }, 2000);

    } catch (error) {
      console.error("Error starting module:", error);
      toast.error("Failed to start module. Please try again.", { autoClose: 2000 });
    }
  };

  if (loading) {
    return (
      <div className="module-page">
        <Navbar />
        <div className="loading">Loading module content...</div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="module-page">
        <Navbar />
        <div className="error">{error || "Failed to load module content"}</div>
      </div>
    );
  }

  return (
    <div className="module-page">
      <Navbar />
      <ToastContainer />
      
      {/* Overview Section */}
      <div className="overview-section">
        <h2>{moduleName.replace("-", " ").toUpperCase()}</h2>
        {content.overview_content?.description && (
          <p>{content.overview_content.description}</p>
        )}
        <div className="overview-details">
          {content.overview_content?.adoption_date && (
            <p><strong>Adoption Date:</strong> {content.overview_content.adoption_date}</p>
          )}
          {content.overview_content?.significance && (
            <p><strong>Significance:</strong> {content.overview_content.significance}</p>
          )}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="module-buttons">
        <button onClick={started} className="start-btn">Start Module</button>
      </div>

      {/* Video Section - Only for Preamble */}
      {moduleName === 'preamble' && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Ef_91JlstZo?si=H528zOBxSN_noezi"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Section - Only for Fundamental Rights */}
      {moduleName === 'fundamental-rights' && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CaXQEsln1iY?si=wKR0uamHtG6r4079"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Section - Only for Directive Principles */}
      {moduleName === 'directive-principles' && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/cTL1IlNIZ_Q?si=neVQGXktuG2HNdc_"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video Section - Only for Fundamental Duties */}
      {moduleName === 'fundamental-duties' && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/VopWuyt4uGU?si=Le9i0TRWm-tu-Juf"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ModulePage;
