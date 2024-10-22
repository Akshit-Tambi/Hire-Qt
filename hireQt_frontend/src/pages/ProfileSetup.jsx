import React, { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import ResumeUpload from '../components/ResumeUpload';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    college: '',
    graduationYear: '',
    domains: [],
    hometownState: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value].slice(0, 3)
    }));
  };

  // Data sources (JSON files in public folder)
  const collegesDataSource = "/colleges.json";
  const yearsDataSource = "/years.json";
  const domainsDataSource = "/domains.json";
  const statesDataSource = "/states.json";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold">Hi, Ayush Agarwal</h2>
        <p className="text-sm text-gray-600">Welcome to HireQT. Let's get started by setting up your profile</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md">Get Started →</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College / University name?</label>
          <CustomSelect
            placeholder="Type College Name"
            dataSource={collegesDataSource}
            onSelect={(value) => handleChange('college', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year of graduation?</label>
          <CustomSelect
            placeholder="Select Graduation Year"
            dataSource={yearsDataSource}
            onSelect={(value) => handleChange('graduationYear', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Which domain are you interested in working? (add up to 3)</label>
          <CustomSelect
            placeholder="Typea Domains"
            dataSource={domainsDataSource}
            onSelect={(value) => handleMultiSelect('domains', value)}
          />
          {formData.domains.length > 0 && (
            <div className="mt-2">
              {formData.domains.map((domain, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2">
                  {domain}
                  <button 
                    onClick={() => handleMultiSelect('domains', domain)} 
                    className="ml-1 text-blue-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select your hometown state?</label>
          <CustomSelect
            placeholder="Select your hometown state"
            dataSource={statesDataSource}
            onSelect={(value) => handleChange('hometownState', value)}
          />
        </div>
      </div>
      <div>
        <ResumeUpload/>
      </div>

      <pre className="mt-6 p-4 bg-gray-100 rounded-md overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};

export default ProfileSetup;