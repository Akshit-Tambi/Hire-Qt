import React, { useState } from 'react';
import CustomSelect from '../components/CustomSelect';
import ResumeUpload from '../components/ResumeUpload';
import { useNavigate } from 'react-router-dom';
const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    education: [{ institution: '', major: '', cgpa: '' }],
    workExperience: [{ title: '', company: '', startMonth: '', endMonth: '', description: '' }],
    projects: [{ name: '', description: '', technologies: '' }],
    links: {
      linkedin: '',
      github: '',
      codingProfile: ''
    },
    customJobProfile: '',
    desiredJobProfiles: []
  });
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const domainsDataSource = "/domains.json";
  const collegesDataSource = "/colleges.json";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateArrayField = (field, index, updates) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    }));
  };

  const addArrayField = (field) => {
    const newField = field === 'education' ? { institution: '', major: '', cgpa: '' } :
                     field === 'workExperience' ? { title: '', company: '', startMonth: '', endMonth: '', description: '' } :
                     { name: '', description: '', technologies: '' };
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], newField]
    }));
  };

  const handleJobProfileToggle = (profile) => {
    setFormData(prev => ({
      ...prev,
      desiredJobProfiles: prev.desiredJobProfiles.includes(profile)
        ? prev.desiredJobProfiles.filter(p => p !== profile)
        : [...prev.desiredJobProfiles, profile]
    }));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const formData = new FormData();
      formData.append('pdf_file', file);

      try {
        const response = await fetch('http://127.0.0.1:8000/parse_resume', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();

        // Assuming your API returns an object with the necessary fields
        setFormData(prev => ({
          ...prev,
          firstName: data.firstName || prev.firstName,
          lastName: data.lastName || prev.lastName,
          email: data.email || prev.email,
          phone: data.phone || prev.phone,
          summary: data.summary || prev.summary,
          skills: ' '.join(data.skills) || prev.skills,
          education: [data.education] || prev.education,
          workExperience: data.work_experience || prev.workExperience,
          projects: data.projects || prev.projects
        }));
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert form data to JSON string for data.json
    const jsonData = JSON.stringify(formData, null, 2);
  
    // Create a Blob from the JSON string for data.json
    const dataBlob = new Blob([jsonData], { type: 'application/json' });
  
    // Create a link element for data.json
    const dataLink = document.createElement('a');
    dataLink.href = URL.createObjectURL(dataBlob);
    dataLink.download = 'data.json'; // Name of the file to be downloaded
  
    // Append to the body (required for Firefox)
    document.body.appendChild(dataLink);
  
    // Trigger the download for data.json
    dataLink.click();
  
    // Clean up and remove the link
    document.body.removeChild(dataLink);
  
    // Call the additional API to get jobs data
    try {
      const response = await fetch('http://127.0.0.1:8000/scrape', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: formData.customJobProfile }), // Sending customJobProfile as input
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch jobs data');
      }
  
      const jobsData = await response.json();
  
      // Convert jobs data to JSON string for jobs.json
      const jobsJsonData = JSON.stringify(jobsData, null, 2);
  
      // Create a Blob from the jobs JSON string for jobs.json
      const jobsBlob = new Blob([jobsJsonData], { type: 'application/json' });
  
      // Create a link element for jobs.json
      const jobsLink = document.createElement('a');
      jobsLink.href = URL.createObjectURL(jobsBlob);
      jobsLink.download = 'jobs.json'; // Name of the file to be downloaded
  
      // Append to the body (required for Firefox)
      document.body.appendChild(jobsLink);
  
      // Trigger the download for jobs.json
      jobsLink.click();
  
      // Clean up and remove the link
      document.body.removeChild(jobsLink);
  
      // Navigate to the dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 15000);
    } catch (error) {
      console.error('Error during submission:', error);
      // Optionally handle the error (e.g., show an alert or a message to the user)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-yellow-50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-700 text-white py-6 px-8">
          <h1 className="text-3xl font -bold text-center">Profile Setup</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Upload Resume Section */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <label className="block text-gray-700 mb-2">Upload Resume</label>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={ResumeUpload} 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
              required 
            />
            <hr className="my-4" />
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6 bg-yellow-50 p-6 rounded-lg">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input 
                type="text" 
                name="firstName" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input 
                type="text" 
                name="lastName" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-yellow-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Institution</label>
                  <CustomSelect
                    placeholder="Type College Name"
                    dataSource={collegesDataSource}
                    onSelect={(value) => handleChange('college', value)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Major</label>
                    <input 
                      type="text" 
                      name="major"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter major"
                      value={edu.major}
                      onChange={(e) => updateArrayField('education', index, { major: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CGPA</label>
                    <input 
                      type="number" 
                      name="cgpa"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter CGPA"
                      value={edu.cgpa}
                      onChange={(e) => updateArrayField('education', index, { cgpa: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addArrayField('education')} 
              className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
            >
              Add Education
            </button>
          </div>

          {/* Work Experience */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h2>
            {formData.workExperience.map((work, index) => (
              <div key={index} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Job Title</label>
                    <input 
                      type="text" 
                      name="title"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter job title"
                      value={work.title}
                      onChange={(e) => updateArrayField('workExperience', index, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      placeholder="Enter company name"
                      value={work.company}
                      onChange={(e) => updateArrayField('workExperience', index, { company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Start Month</label>
                    <input 
                      type="month" 
                      name="startMonth"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      value={work.startMonth}
                      onChange={(e) => updateArrayField('workExperience', index, { startMonth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End Month</label>
                    <input type="month" 
                      name="endMonth"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                      value={work.endMonth}
                      onChange={(e) => updateArrayField('workExperience', index, { endMonth: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Job Description</label>
                  <textarea 
                    name="description"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Describe your responsibilities"
                    value={work.description}
                    onChange={(e) => updateArrayField('workExperience', index, { description: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addArrayField('workExperience')} 
              className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
            >
              Add More Work Experience
            </button>
          </div>

          {/* Projects */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Project Name</label>
                  <input 
                    type="text" 
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Enter project name"
                    value={project.name}
                    onChange={(e) => updateArrayField('projects', index, { name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Project Description</label>
                  <textarea 
                    name="description"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Describe your project value={project.description}"
                    onChange={(e) => updateArrayField('projects', index, { description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Technologies Used</label>
                  <input 
                    type="text" 
                    name="technologies"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                    placeholder="Enter technologies used"
                    value={project.technologies}
                    onChange={(e) => updateArrayField('projects', index, { technologies: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addArrayField('projects')} 
              className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg"
            >
              Add More Projects
            </button>
          </div>

          {/* Job Profile */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Desired Job Profile</h2>
            <div>
              <label className="block text-gray-700 mb-2">Custom Job Profile</label>
              <input 
                type="text" 
                name="customJobProfile"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                placeholder="Enter your desired job profile"
                value={formData.customJobProfile}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Links Section */}
          <section className="bg-yellow-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700">LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  placeholder="LinkedIn URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.linkedin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, linkedin: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">GitHub Profile</label>
                <input 
                  type="url" 
                  name="github" 
                  placeholder="GitHub URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.github}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, github: e.target.value }
                  }))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-gray-700">Coding Profile</label>
                <input 
                  type="url" 
                  name="codingProfile" 
                  placeholder="LeetCode/HackerRank URL" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500" 
                  value={formData.links.codingProfile}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    links: { ...prev.links, codingProfile: e.target.value }
                  }))}
                />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-cyan-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;