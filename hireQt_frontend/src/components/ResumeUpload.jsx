import React, { useState } from 'react';
import { upload } from '../services/operations/authApi';

const ResumeUpload = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [resumeData, setResumeData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    if (file.type !== 'application/pdf') {
      setUploadStatus('Please upload a PDF file');
      return;
    }

    try { 
      const response = await upload(file); 

      if (response) {
        setUploadStatus('Resume uploaded successfully!');
        setResumeData(response.data);
        console.log(response.data);
      } else {
        setUploadStatus('Failed to upload resume.');
      }
    } catch (error) {
      setUploadStatus('Failed to upload resume.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept=".pdf"
      />
      {uploadStatus && <p>{uploadStatus}</p>}
      {resumeData && <pre>{JSON.stringify(resumeData, null, 2)}</pre>} {/* Display parsed resume data */}
    </div>
  );
};

export default ResumeUpload;






















