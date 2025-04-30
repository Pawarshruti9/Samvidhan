import React from 'react';
import './Certificate.css';

const Certificate = ({ certificate }) => {
    console.log('Certificate component received data:', certificate);

    if (!certificate || !certificate.userName || !certificate.moduleName) {
        console.error('Invalid certificate data:', certificate);
        return (
            <div className="certificate-container">
                <div className="certificate">
                    <div className="certificate-header">
                        <h1>Error Loading Certificate</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="certificate-container">
            <div className="certificate">
                <div className="certificate-header">
                    <h1>Certificate of Completion</h1>
                </div>
                <div className="certificate-body">
                    <div className="certificate-seal"></div>
                    <p className="certificate-title">This is to certify that</p>
                    <h2 className="certificate-name">{certificate.userName}</h2>
                    <p className="certificate-text">
                        has successfully completed the module on
                    </p>
                    <h3 className="certificate-module">{certificate.moduleName}</h3>
                    <p className="certificate-text">
                        of the Indian Constitution Learning Program
                    </p>
                    <div className="certificate-footer">
                        <div className="certificate-date">
                            <p>Date of Completion</p>
                            <span>{certificate.completionDate}</span>
                        </div>
                        <div className="certificate-signature">
                            <div className="signature-line"></div>
                            <p>Samvidhan Learning Platform</p>
                        </div>
                    </div>
                    <div className="certificate-id">
                        Certificate ID: {certificate.certificateId}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificate; 