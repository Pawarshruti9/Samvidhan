import React from "react";
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

  const started = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/test/statusstarted", { course: moduleName }, { withCredentials: true });
      console.log(response.data);
      toast.success("Module started successfully!", { autoClose: 2000 });
      setTimeout(() => {
        navigate(`/module/${moduleName}/submodule/0`);
      }, 2000);
  
    } catch (error) {
      toast.error("Failed to start module. Please try again.", { autoClose: 2000 });
    }
  };

  // Define YouTube videos & theory for each module
  const moduleContent = {
    preamble: {
      video: "https://www.youtube.com/embed/zjmstaR9DNI",
      theory: `The Preamble of the Indian Constitution serves as the introduction and reflects the guiding principles and philosophy of the document. It declares India as a sovereign, socialist, secular, and democratic republic, ensuring justice, liberty, equality, and fraternity for all citizens.`,
      file: "/files/preamble.pdf", // Sample file URL
    },
    "fundamental-rights": {
      video: "https://www.youtube.com/embed/example2",
      theory: `Fundamental Rights are the cornerstone of the Indian Constitution, providing citizens with essential freedoms such as the Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and the Right to Constitutional Remedies.`,
      file: "/files/fundamental-rights.pdf",
    },
    "directive-principles": {
      video: "https://www.youtube.com/embed/example3",
      theory: `Directive Principles of State Policy are guidelines for the government to establish social and economic democracy. They include principles promoting social welfare, economic equality, education, public health, and environmental protection.`,
      file: "/files/directive-principles.pdf",
    },
    "fundamental-duties": {
      video: "https://www.youtube.com/embed/example4",
      theory: `Fundamental Duties were added by the 42nd Amendment in 1976 to remind citizens of their responsibilities towards the nation. These include respecting the Constitution, upholding national unity, safeguarding public property, and promoting harmony.`,
      file: "/files/fundamental-duties.pdf",
    },
  };

  const content = moduleContent[moduleName] || moduleContent["preamble"]; // Default to Preamble

  return (
    <div className="module-page">
      <Navbar />
      <ToastContainer />
      {/* YouTube Video */}
      <div className="video-container">
        <iframe
          src={content.video}
          title="YouTube Video"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>

      {/* Theory Section */}
      <div className="theory-section">
        <h2>{moduleName.replace("-", " ").toUpperCase()}</h2>
        <p>{content.theory}</p>
      </div>

      {/* Buttons Section */}
      <div className="module-buttons">
        <a href={content.file} download className="download-btn">
          Download File
        </a>
        <button onClick={started} className="start-btn">Start Module</button>
      </div>
    </div>
  );
};

export default ModulePage;
