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

  useEffect(() => {
    const fetchModuleContent = async () => {
      try {
        console.log('Fetching content for module:', moduleName);
        const response = await axios.post(
          "http://localhost:4000/api/content/getbyname",
          { main_module: moduleName },
          { withCredentials: true }
        );

        if (response.data) {
          console.log('Received content:', response.data);
          setContent(response.data);
        } else {
          toast.error("Failed to fetch module content");
        }
      } catch (error) {
        console.error("Error fetching module content:", error);
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

  if (!content) {
    return (
      <div className="module-page">
        <Navbar />
        <div className="error">Failed to load module content</div>
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
        <p>{content.overview_content.description}</p>
        <div className="overview-details">
          <p><strong>Adoption Date:</strong> {content.overview_content.adoption_date}</p>
          <p><strong>Significance:</strong> {content.overview_content.significance}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="module-buttons">
        <button onClick={started} className="start-btn">Start Module</button>
      </div>
    </div>
  );
};

export default ModulePage;
