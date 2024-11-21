import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [resumeData, setResumeData] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file');
      return;
    }

    if (file.type !== 'application/pdf') {
      setUploadStatus('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/parse_resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus('Resume uploaded successfully!');
      setResumeData(response.data);
      console.log(response.data);
    } catch (error) {
      setUploadStatus('Failed to upload resume.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".pdf"
        />
        <button type="submit">Upload Resume</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ResumeUpload;