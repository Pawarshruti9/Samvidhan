import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import "./submodulePage.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubmodulePage = () => {
  const { moduleName, submoduleIndex } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSubmodule, setCurrentSubmodule] = useState(null);

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

        const response = await axios.post(
          "http://localhost:4000/api/content/getbyname",
          { main_module: formattedModuleName },
          { withCredentials: true }
        );

        if (response.data) {
          console.log('Received content:', response.data);
          setContent(response.data);
          setCurrentSubmodule(response.data.submodules[parseInt(submoduleIndex)]);
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
  }, [moduleName, submoduleIndex]);

  const updateProgress = async () => {
    try {
      console.log('Updating progress for module:', moduleName);
      const response = await axios.post(
        'http://localhost:4000/api/users/updateprogress',
        { 
          moduleName: moduleName,
          status: 'inprogress'
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Progress update response:', response.data);
      if (response.data.success) {
        // Only show toast for the first next button click
        if (parseInt(submoduleIndex) === 0) {
          toast.success('Progress updated successfully');
        }
      } else {
        toast.error(response.data.message || 'Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update progress');
    }
  };

  const handleNext = async () => {
    try {
      // Update progress status
      await updateProgress();

      const nextIndex = parseInt(submoduleIndex) + 1;
      if (nextIndex < content.submodules.length) {
        navigate(`/module/${moduleName}/submodule/${nextIndex}`);
      } else {
        // Navigate to quiz or completion page
        navigate(`/module/${moduleName}/quiz`);
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      toast.error('Failed to proceed to next submodule');
    }
  };

  if (loading) {
    return (
      <div className="submodule-page">
        <Navbar />
        <div className="loading">Loading submodule content...</div>
      </div>
    );
  }

  if (!currentSubmodule) {
    return (
      <div className="submodule-page">
        <Navbar />
        <div className="error">Failed to load submodule content</div>
      </div>
    );
  }

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    } else if (Array.isArray(content)) {
      return (
        <ul>
          {content.map((item, index) => (
            <li key={index}>{renderContent(item)}</li>
          ))}
        </ul>
      );
    } else if (typeof content === 'object') {
      return (
        <div className="content-section">
          {Object.entries(content).map(([key, value]) => {
            // Skip rendering if value is null or undefined
            if (value === null || value === undefined) return null;
            
            // Format the key for display
            const formattedKey = key
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            return (
              <div key={key} className="content-block">
                {key === 'article_reference' ? (
                  <div className="article-reference">
                    <h3>Article Reference</h3>
                    <p>{value}</p>
                  </div>
                ) : (
                  <>
                    <h3>{formattedKey}</h3>
                    {typeof value === 'object' && 'description' in value ? (
                      <>
                        <p className="description">{value.description}</p>
                        {value.principles && (
                          <ul className="principles-list">
                            {value.principles.map((principle, idx) => (
                              <li key={idx}>{principle}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      renderContent(value)
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="submodule-page">
      <Navbar />
      <ToastContainer />
      
      <div className="submodule-content">
        <h2>{currentSubmodule.title}</h2>
        {renderContent(currentSubmodule.content)}
      </div>

      <div className="submodule-navigation">
        <button onClick={handleNext} className="next-btn">
          {parseInt(submoduleIndex) < content.submodules.length - 1 ? "Next" : "Go to Quiz"}
        </button>
      </div>
    </div>
  );
};

export default SubmodulePage;
