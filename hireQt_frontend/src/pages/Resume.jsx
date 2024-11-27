import React, { useState, useRef } from 'react';
import { FileUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { upload, save_to_db } from '../services/operations/authApi';
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      await uploadResume(selectedFile);
    } else {
      alert('Please upload only PDF files');
    }
  };

  const uploadResume = async (fileToUpload) => {
    if (!fileToUpload) {
      alert('Please select a resume first');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('resume', fileToUpload);

      const response = await upload(fileToUpload);
      const db_response = await save_to_db(fileToUpload)
      
      // Assuming successful upload sets uploadSuccess to true
      setUploadSuccess(true);
      console.log('Resume uploaded:', response);
      console.log('Resume saved in mongodb:', db_response);
      setTimeout(() => {
        navigate('/profile', { state: { response } });
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      alert('Failed to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const proceedWithoutResume = () => {
    // Navigate to the next page without uploading a resume
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-cyan-300 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 transform transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-cyan-800 mb-6">
          Upload Your Resume
        </h2>

        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer 
          ${uploadSuccess ? 'border-green-500 bg-green-50' : 'border-cyan-300 hover:border-cyan-500'}`}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept=".pdf" 
            className="hidden" 
          />

          <div className="flex flex-col items-center space-y-4">
            {uploadSuccess ? (
              <CheckCircle2 className="text-green-500 w-12 h-12" />
            ) : (
              <FileUp className="text-cyan-500 w-12 h-12" />
            )}
            
            {file && !uploadSuccess ? (
              <div className="text-center">
                <p className="font-semibold text-cyan-700">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : uploadSuccess ? (
              <p className="text-green-600 font-semibold">Resume Uploaded Successfully!</p>
            ) : (
              <>
                <p className="text-gray-600">
                  Drag & Drop or Click to Upload Resume
                </p>
                <span className="text-xs text-gray-500">
                  PDF files only (Max 5MB)
                </span>
              </>
            )}
          </div>
        </div>

        {file && !uploadSuccess && (
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={clearFile}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Clear
            </button>
            <button 
              onClick={() => uploadResume(file)}
              disabled={isUploading}
              className={`w-full ${
                isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-cyan-500 hover:bg-cyan-600'
              } text-white py-3 rounded-lg transition`}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}

        {/* Proceed without Resume button */}
        {!file && !uploadSuccess && (
          <div className="mt-6">
            <button 
              onClick={proceedWithoutResume}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center space-x-2"
            >
              <span>Proceed without Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;